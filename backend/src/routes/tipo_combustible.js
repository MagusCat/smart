// routes/tipoCombustible
import { Router } from 'express'; 
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validaciones
const validateTipoCombustibleData = (req, res, next) => {
  const { combustible } = req.body;
  const errors = [];
  
  // Verificar existencia y tipo
  if (!combustible || typeof combustible !== 'string') {
    errors.push('El tipo de combustible es requerido y debe ser texto');
  }
  
  // Verificar longitud solo si existe
  if (combustible && combustible.length > 50) {
    errors.push('El tipo no puede exceder 50 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,  // Agregado para consistencia
      errors 
    });
  }
  
  next();
};

const validateTipoCombustibleId = (req, res, next) => {
  const { id_tipo_combustible } = req.params;
  
  if (!id_tipo_combustible || isNaN(id_tipo_combustible)) {
    return res.status(400).json({ 
      success: false,  // Agregado para consistencia
      error: 'ID de tipo combustible inválido' 
    });
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
      .query('SELECT COUNT(*) AS total FROM Tipo_Combustible');
    const total = countResult.recordset[0].total;

    // Obtener datos paginados
    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_tipo_combustible, combustible
        FROM Tipo_Combustible
        ORDER BY combustible
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
    console.error('Error al obtener la marca:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la marca',
      details: error.message
    });
  }
});

// GET marca por ID
router.get('/:id_tipo_combustible', validateTipoCombustibleId, async (req, res) => {
  try {
    const { id_tipo_combustible } = req.params;
    const pool = await poolOLTP;
    
    const result = await pool.request()
      .input('id_tipo_combustible', sql.Int, id_tipo_combustible)
      .query('SELECT id_tipo_combustible, combustible FROM Tipo_Combustible WHERE id_tipo_combustible = @id_tipo_combustible');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'tipo de combustible no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener combustible:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener combustible',
      details: error.message
    });
  }
});

// POST agregar combustible
router.post('/', validateTipoCombustibleData, async (req, res) => {
  try {
    const { combustible } = req.body;
    const pool = await poolOLTP;
    
    // Verificar si el combustible ya existe
    const exists = await pool.request()
      .input('combustible', sql.NVarChar(50), combustible)
      .query('SELECT 1 FROM Tipo_Combustible WHERE combustible = @combustible');
    
    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El combustible ya existe'
      });
    }
    
    const result = await pool.request()
      .input('combustible', sql.NVarChar(50), combustible)
      .query('INSERT INTO Tipo_Combustible (combustible) OUTPUT INSERTED.id_tipo_combustible VALUES (@combustible)');
    
    res.status(201).json({
      success: true,
      data: {
        id_tipo_combustible: result.recordset[0].id_tipo_combustible,
        combustible
      },
      message: 'Combustible agregado exitosamente'
    });
  } catch (error) {
    console.error('Error al agregar combustible:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar combustible',
      details: error.message
    });
  }
});

// PUT actualizar combustible
router.put('/:id_tipo_combustible', validateTipoCombustibleId, validateTipoCombustibleData, async (req, res) => {
  try {
    const { id_tipo_combustible } = req.params;
    const { combustible } = req.body;
    const pool = await poolOLTP;
    
    // Verificar si la marca existe
    const exists = await pool.request()
      .input('id_tipo_combustible', sql.Int, id_tipo_combustible)
      .query('SELECT combustible FROM Tipo_Combustible WHERE id_tipo_combustible = @id_tipo_combustible');
    
    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Combustible no encontrado'
      });
    }
    
    // Verificar si el nuevo nombre ya existe (en otra marca)
    const nameExists = await pool.request()
      .input('combustible', sql.NVarChar(50), combustible)
      .input('id_tipo_combustible', sql.Int, id_tipo_combustible)
      .query('SELECT 1 FROM Tipo_Combustible WHERE combustible = @combustible AND id_tipo_combustible != @id_tipo_combustible');
    
    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del combustible ya está existe'
      });
    }
    
    await pool.request()
      .input('id_tipo_combustible', sql.Int, id_marca)
      .input('combustible', sql.NVarChar(50), combustible)
      .query('UPDATE Tipo_Combustible SET combustible = @combustible WHERE id_tipo_combustible = @id_tipo_combustible');
    
    res.json({
      success: true,
      data: {
        id_tipo_combustible: parseInt(id_tipo_combustible),
        combustible
      },
      message: 'Combustible actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar tipo de combustible:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de combustible',
      details: error.message
    });
  }
});


// DELETE eliminar tipo de combustible
router.delete('/:id_tipo_combustible', validateTipoCombustibleId, async (req, res) => {
  try {
    const { id_tipo_combustible } = req.params;
    const pool = await poolOLTP;
    
    // Verificar si el tipo de combustible existe
    const exists = await pool.request()
      .input('id_tipo_combustible', sql.Int, id_tipo_combustible)
      .query('SELECT combustible FROM Tipo_Combustible WHERE id_tipo_combustible = @id_tipo_combustible');
    
    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Combustible no encontrado'
      });
    }

    // Eliminar el tipo de combustible
    await pool.request()
      .input('id_tipo_combustible', sql.Int, id_tipo_combustible)
      .query('DELETE FROM Tipo_Combustible WHERE id_tipo_combustible = @id_tipo_combustible');
    
    res.json({
      success: true,
      message: 'Tipo de combustible eliminado exitosamente',
      id_tipo_combustible: parseInt(id_tipo_combustible)
    });
  } catch (error) {
    console.error('Error al eliminar el tipo de combustible:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el tipo de combustible',
      details: error.message
    });
  }
});

export default router;