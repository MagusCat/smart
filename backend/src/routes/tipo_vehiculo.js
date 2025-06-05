// routes/tipoVehiculo
import { Router } from 'express'; 
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validaciones
const validateTipoVehiculoData = (req, res, next) => {
  const { vehiculo } = req.body;
  const errors = [];
  
  if (!vehiculo || typeof tipo !== 'string') {
    errors.push('El tipo de vehículo es requerido y debe ser texto');
  }
  
  if (vehiculo && tipo.length > 50) {
    errors.push('El tipo no puede exceder 50 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};

const validateTipoVehiculoId = (req, res, next) => {
  const { id_tipo_vehiculo } = req.params;
  
  if (!id_tipo_vehiculo || isNaN(id_tipo_vehiculo)) {
    return res.status(400).json({ error: 'ID de tipo vehículo inválido' });
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
      .query('SELECT COUNT(*) AS total FROM Tipo_Vehiculo');
    const total = countResult.recordset[0].total;

    // Obtener datos paginados
    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_tipo_vehiculo, vehiculo
        FROM Tipo_Vehiculo
        ORDER BY vehiculo
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
    console.error('Error al obtener el tipo de vehiculo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de vehiculo',
      details: error.message
    });
  }
});

// GET - Obtener Tipo Vehiculo por ID
router.get('/:id_tipo_vehiculo', validateTipoVehiculoId, async (req, res) => {
  try {
    const { id_tipo_vehiculo } = req.params;
    const pool = await poolOLTP;
    
    const result = await pool.request()
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .query('SELECT id_tipo_vehiculo, vehiculo FROM Tipo_Vehiculo WHERE id_tipo_vehiculo = @id_tipo_vehiculo');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de vehiculo no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener el tipo de vehiculo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de vehiculo',
      details: error.message
    });
  }
});

// POST agregar Tipo Vehiculo
router.post('/', validateTipoVehiculoData, async (req, res) => {
  try {
    const { vehiculo } = req.body;
    const pool = await poolOLTP;
    
    // Verificar si el Tipo Vehiculo ya existe
    const exists = await pool.request()
      .input('vehiculo', sql.NVarChar(50), vehiculo)
      .query('SELECT 1 FROM Tipo_Vehiculo WHERE vehiculo = @vehiculo');
    
    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El Vehiculo ya existe'
      });
    }
    
    const result = await pool.request()
      .input('vehiculo', sql.NVarChar(50), vehiculo)
      .query('INSERT INTO Tipo_Vehiculo (vehiculo) OUTPUT INSERTED.id_tipo_vehiculo VALUES (@vehiculo)');
    
    res.status(201).json({
      success: true,
      data: {
        id_tipo_vehiculo: result.recordset[0].id_tipo_vehiculo,
        id_tipo_vehiculo
      },
      message: 'Vehiculo agragado exitosamente'
    });
  } catch (error) {
    console.error('Error al agregar vehiculo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar vehiculo',
      details: error.message
    });
  }
});

// PUT actualizar Tipo Vehiculo
router.put('/:id_tipo_vehiculo', validateTipoVehiculoId, validateTipoVehiculoData, async (req, res) => {
  try {
    const { id_tipo_vehiculo } = req.params;
    const { vehiculo } = req.body;
    const pool = await poolOLTP;
    
    // Verificar si la marca existe
    const exists = await pool.request()
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .query('SELECT vehiculo FROM Tipo_Vehiculo WHERE id_tipo_vehiculo = @id_tipo_vehiculo');
    
    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de vehiculo no encontrado'
      });
    }
    
    // Verificar si el nuevo nombre ya existe 
    const nameExists = await pool.request()
      .input('vehiculo', sql.NVarChar(50), vehiculo)
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .query('SELECT 1 FROM Tipo_Vehiculo WHERE vehiculo = @vehiculo AND id_tipo_vehiculo != @id_tipo_vehiculo');
    
    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de vehiculo ya está existe'
      });
    }
    
    await pool.request()
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .input('vehiculo', sql.NVarChar(50), vehiculo)
      .query('UPDATE Tipo_Vehiculo SET vehiculo = @vehiculo WHERE id_tipo_vehiculo = @id_tipo_vehiculo');
    
    res.json({
      success: true,
      data: {
        id_tipo_vehiculo: parseInt(id_tipo_vehiculo),
        Tipo_Vehiculo
      },
      message: 'Tipo de vehiculo actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar tipo de vehiculo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de vehiculo',
      details: error.message
    });
  }
});

// DELETE eliminar tipo de vehiculo
router.delete('/:id_tipo_vehiculo', validateTipoVehiculoId, async (req, res) => {
  try {
    const { id_tipo_vehiculo } = req.params;
    const pool = await poolOLTP;
    
    // Verificar si el tipo de vehiculo existe
    const exists = await pool.request()
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .query('SELECT vehiculo FROM Tipo_Vehiculo WHERE id_tipo_vehiculo = @id_tipo_vehiculo');
    
    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de vehiculo no encontrado'
      });
    }

    // Eliminar el tipo de vehiculo
    await pool.request()
      .input('id_tipo_vehiculo', sql.Int, id_tipo_vehiculo)
      .query('DELETE FROM Tipo_Vehiculo WHERE id_tipo_vehiculo = @id_tipo_vehiculo');
    
    res.json({
      success: true,
      message: 'Tipo de vehiculo eliminado exitosamente',
      id_tipo_vehiculo: parseInt(id_tipo_vehiculo)
    });
  } catch (error) {
    console.error('Error al eliminar el tipo de vehiculo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el tipo de vehiculo',
      details: error.message
    });
  }
});

export default router;