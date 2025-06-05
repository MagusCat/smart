import { Router } from 'express';
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

const validateTipoUsoData = (req, res, next) => {
  const { uso } = req.body;
  const errors = [];

  if (!uso || typeof uso !== 'string' || uso.trim() === '') {
    errors.push('El nombre del tipo de uso es requerido y debe ser texto');
  }

  if (uso && uso.length > 50) {
    errors.push('El nombre no puede exceder 50 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false, // Añadido para consistencia
      errors
    });
  }

  next();
};

const validateTipoUsoId = (req, res, next) => { // Corregido: 'validateTipoUSoId' a 'validateTipoUsoId'
  const { id_uso } = req.params;

  if (!id_uso || isNaN(parseInt(id_uso))) { // Usar parseInt para manejar strings numéricos y evitar isNaN(undefined)
    return res.status(400).json({
      success: false, // Añadido para consistencia
      error: 'ID de tipo de uso inválido' // Mensaje corregido
    });
  }

  next();
};

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const pool = await poolOLTP;

    const countResult = await pool.request()
      .query('SELECT COUNT(*) AS total FROM Tipo_Uso'); // Asegúrate que la tabla es Tipo_Uso
    const total = countResult.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_uso, uso
        FROM Tipo_Uso
        ORDER BY uso
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
    console.error('Error al obtener los tipos de uso:', error); // Mensaje corregido
    res.status(500).json({
      success: false,
      error: 'Error al obtener los tipos de uso', // Mensaje corregido
      details: error.message
    });
  }
});

router.get('/:id_uso', validateTipoUsoId, async (req, res) => { // Corregido: 'validateTipoUSoId' a 'validateTipoUsoId'
  try {
    const { id_uso } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('id_uso', sql.Int, id_uso)
      .query('SELECT id_uso, uso FROM Tipo_Uso WHERE id_uso = @id_uso'); // Corregido: de 'Marca' a 'Tipo_Uso' y 'marca' a 'uso'

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de uso no encontrado'
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener el tipo de uso por ID:', error); // Mensaje corregido
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de uso',
      details: error.message
    });
  }
});

router.post('/', validateTipoUsoData, async (req, res) => {
  try {
    const { uso } = req.body;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('uso', sql.NVarChar(50), uso)
      .query('SELECT 1 FROM Tipo_Uso WHERE uso = @uso'); // Corregido: de 'Uso' a 'Tipo_Uso'

    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El tipo de uso ya existe'
      });
    }

    const result = await pool.request()
      .input('uso', sql.NVarChar(50), uso)
      .query('INSERT INTO Tipo_Uso (uso) OUTPUT INSERTED.id_uso VALUES (@uso)'); // Corregido: de 'Uso' a 'Tipo_Uso'

    res.status(201).json({
      success: true,
      data: {
        id_uso: result.recordset[0].id_uso,
        uso
      },
      message: 'Tipo de uso creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear el tipo de uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el tipo de uso',
      details: error.message
    });
  }
});

router.put('/:id_uso', validateTipoUsoId, validateTipoUsoData, async (req, res) => { // Corregido: 'validateTipoUSoId' a 'validateTipoUsoId'
  try {
    const { id_uso } = req.params;
    const { uso } = req.body;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_uso', sql.Int, id_uso)
      .query('SELECT uso FROM Tipo_Uso WHERE id_uso = @id_uso'); // Corregido: de 'Uso' a 'Tipo_Uso'

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de uso no encontrado'
      });
    }

    const nameExists = await pool.request()
      .input('uso', sql.NVarChar(50), uso)
      .input('id_uso', sql.Int, id_uso)
      .query('SELECT 1 FROM Tipo_Uso WHERE uso = @uso AND id_uso != @id_uso'); // Corregido: de 'USo' a 'Tipo_Uso'

    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de uso ya está en uso' // Mensaje corregido
      });
    }

    await pool.request()
      .input('id_uso', sql.Int, id_uso)
      .input('uso', sql.NVarChar(50), uso)
      .query('UPDATE Tipo_Uso SET uso = @uso WHERE id_uso = @id_uso'); // Corregido: de 'Uso' a 'Tipo_Uso'

    res.json({
      success: true,
      data: {
        id_uso: parseInt(id_uso),
        uso
      },
      message: 'Tipo de uso actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar el tipo de uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el tipo de uso',
      details: error.message
    });
  }
});

router.delete('/:id_uso', validateTipoUsoId, async (req, res) => { // Corregido: 'validateCategoryId' a 'validateTipoUsoId'
  try {
    const { id_uso } = req.params;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_uso', sql.Int, id_uso)
      .query('SELECT uso FROM Tipo_Uso WHERE id_uso = @id_uso'); // Corregido: de 'Uso' a 'Tipo_Uso'

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de uso no encontrado'
      });
    }

    await pool.request()
      .input('id_uso', sql.Int, id_uso)
      .query('DELETE FROM Tipo_Uso WHERE id_uso = @id_uso'); // Corregido: de 'Uso' a 'Tipo_Uso'

    res.json({
      success: true,
      message: 'Tipo de uso eliminado exitosamente',
      id_uso: parseInt(id_uso)
    });
  } catch (error) {
    console.error('Error al eliminar el tipo de uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el tipo de uso',
      details: error.message
    });
  }
});

export default router;