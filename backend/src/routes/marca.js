import { Router } from 'express';
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validaciones
const validateMarcaData = (req, res, next) => {
  const { marca } = req.body;
  const errors = [];

  if (!marca || typeof marca !== 'string' || marca.trim() === '') {
    errors.push('El nombre de la marca es requerido y debe ser texto');
  }

  if (marca && marca.length > 50) {
    errors.push('El nombre no puede exceder 50 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors }); // Añadido success: false para consistencia
  }

  next();
};

const validateMarcaId = (req, res, next) => {
  const { id_marca } = req.params;

  if (!id_marca || isNaN(parseInt(id_marca))) { // Usar parseInt para una validación más robusta
    return res.status(400).json({ success: false, error: 'ID de marca inválido' }); // Añadido success: false para consistencia
  }

  next();
};

// GET todos los tipos de vehículo con paginación
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const pool = await poolOLTP;

    // Obtener total de registros
    const countResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Marca');
    const total = countResult.recordset[0].total;

    // Obtener datos paginados
    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_marca, marca
        FROM Marca
        ORDER BY marca
        OFFSET @offset ROWS
        FETCH NEXT @limit ROWS ONLY
      `);

    res.json({
      success: true,
      data: result.recordset,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error al obtener las marcas:', error); // Mensaje corregido
    res.status(500).json({
      success: false,
      error: 'Error al obtener las marcas', // Mensaje corregido
      details: error.message
    });
  }
});

// GET marca por ID
router.get('/:id_marca', validateMarcaId, async (req, res) => {
  try {
    const { id_marca } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('id_marca', sql.Int, id_marca)
      .query('SELECT id_marca, marca FROM Marca WHERE id_marca = @id_marca');

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Marca no encontrada'
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener marca por ID:', error); // Mensaje corregido
    res.status(500).json({
      success: false,
      error: 'Error al obtener marca',
      details: error.message
    });
  }
});

// POST crear marca
router.post('/', validateMarcaData, async (req, res) => {
  try {
    const { marca } = req.body; // CORREGIDO: Usar 'marca' del body, no 'nombre'
    const pool = await poolOLTP;

    // Verificar si la marca ya existe
    const exists = await pool.request()
      .input('marca', sql.NVarChar(50), marca)
      .query('SELECT 1 FROM Marca WHERE marca = @marca');

    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'La marca ya existe'
      });
    }

    const result = await pool.request()
      .input('marca', sql.NVarChar(50), marca)
      .query('INSERT INTO Marca (marca) OUTPUT INSERTED.id_marca VALUES (@marca)');

    res.status(201).json({
      success: true,
      data: {
        id_marca: result.recordset[0].id_marca,
        marca // CORREGIDO: Usar 'marca', no 'nombre'
      },
      message: 'Marca creada exitosamente'
    });
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear marca',
      details: error.message
    });
  }
});

// PUT actualizar marca
router.put('/:id_marca', validateMarcaId, validateMarcaData, async (req, res) => {
  try {
    const { id_marca } = req.params;
    const { marca } = req.body; // CORREGIDO: Usar 'marca' del body, no 'nombre'
    const pool = await poolOLTP;

    // Verificar si la marca existe
    const exists = await pool.request()
      .input('id_marca', sql.Int, id_marca)
      .query('SELECT marca FROM Marca WHERE id_marca = @id_marca');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Marca no encontrada'
      });
    }

    // Verificar si el nuevo nombre ya existe (en otra marca)
    const nameExists = await pool.request()
      .input('marca', sql.NVarChar(50), marca)
      .input('id_marca', sql.Int, id_marca)
      .query('SELECT 1 FROM Marca WHERE marca = @marca AND id_marca != @id_marca');

    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de marca ya está en uso'
      });
    }

    await pool.request()
      .input('id_marca', sql.Int, id_marca)
      .input('marca', sql.NVarChar(50), marca)
      .query('UPDATE Marca SET marca = @marca WHERE id_marca = @id_marca');

    res.json({
      success: true,
      data: {
        id_marca: parseInt(id_marca),
        marca
      },
      message: 'Marca actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar marca',
      details: error.message
    });
  }
});

// DELETE eliminar Marca
router.delete('/:id_marca', validateMarcaId, async (req, res) => { // CORREGIDO: validateCategoryId a validateMarcaId
  try {
    const { id_marca } = req.params;
    const pool = await poolOLTP;

    // Verificar si la marca existe
    const exists = await pool.request()
      .input('id_marca', sql.Int, id_marca)
      .query('SELECT marca FROM Marca WHERE id_marca = @id_marca');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Marca no encontrada' // Corregido: "Marcar no encontrada" a "Marca no encontrada"
      });
    }

    // Eliminar marca
    await pool.request()
      .input('id_marca', sql.Int, id_marca)
      .query('DELETE FROM Marca WHERE id_marca = @id_marca');

    res.json({
      success: true,
      message: 'Marca eliminada exitosamente',
      id_marca: parseInt(id_marca)
    });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar marca',
      details: error.message
    });
  }
});

export default router;