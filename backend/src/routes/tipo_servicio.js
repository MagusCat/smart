import { Router } from 'express';
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

const validateTipoServicioData = (req, res, next) => {
  const { servicio } = req.body; // Corregido: desestructura 'servicio' del body
  const errors = [];

  if (!servicio || typeof servicio !== 'string' || servicio.trim() === '') {
    errors.push('El tipo de servicio es requerido y debe ser texto'); // Mensaje corregido
  }

  if (servicio && servicio.length > 50) {
    errors.push('El tipo no puede exceder 50 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateTipoServicioId = (req, res, next) => {
  const { id_tipo_servicio } = req.params;

  if (!id_tipo_servicio || isNaN(parseInt(id_tipo_servicio))) { // Usar parseInt para una validación más robusta
    return res.status(400).json({
      success: false,
      error: 'ID de tipo servicio inválido'
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
      .query('SELECT COUNT(*) AS total FROM Tipo_Servicio');
    const total = countResult.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_tipo_servicio, servicio
        FROM Tipo_Servicio
        ORDER BY servicio
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
    console.error('Error al obtener los tipos de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los tipos de servicio',
      details: error.message
    });
  }
});

router.get('/:id_tipo_servicio', validateTipoServicioId, async (req, res) => { // Corregido el validador
  try {
    const { id_tipo_servicio } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .query('SELECT id_tipo_servicio, servicio FROM Tipo_Servicio WHERE id_tipo_servicio = @id_tipo_servicio'); // Corregido: tabla y columna

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de servicio no encontrado' // Mensaje corregido
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener el tipo de servicio por ID:', error); // Mensaje corregido
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de servicio',
      details: error.message
    });
  }
});

router.post('/', validateTipoServicioData, async (req, res) => {
  try {
    const { servicio } = req.body;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('servicio', sql.NVarChar(50), servicio)
      .query('SELECT 1 FROM Tipo_Servicio WHERE servicio = @servicio');

    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El tipo de servicio ya existe'
      });
    }

    const result = await pool.request()
      .input('servicio', sql.NVarChar(50), servicio)
      .query('INSERT INTO Tipo_Servicio (servicio) OUTPUT INSERTED.id_tipo_servicio VALUES (@servicio)');

    res.status(201).json({
      success: true,
      data: {
        id_tipo_servicio: result.recordset[0].id_tipo_servicio,
        servicio
      },
      message: 'Tipo de servicio agregado exitosamente'
    });
  } catch (error) {
    console.error('Error al agregar el tipo de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar el tipo de servicio',
      details: error.message
    });
  }
});

router.put('/:id_tipo_servicio', validateTipoServicioId, validateTipoServicioData, async (req, res) => { // Corregido el parámetro de ruta
  try {
    const { id_tipo_servicio } = req.params;
    const { servicio } = req.body; // Corregido: usar 'servicio'

    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .query('SELECT servicio FROM Tipo_Servicio WHERE id_tipo_servicio = @id_tipo_servicio');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de servicio no encontrado' // Mensaje corregido
      });
    }

    const nameExists = await pool.request()
      .input('servicio', sql.NVarChar(50), servicio) // Corregido: usar 'servicio'
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .query('SELECT 1 FROM Tipo_Servicio WHERE servicio = @servicio AND id_tipo_servicio != @id_tipo_servicio'); // Corregido: tabla y columna

    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de servicio ya está en uso' // Mensaje corregido
      });
    }

    await pool.request()
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .input('servicio', sql.NVarChar(50), servicio) // Corregido: usar 'servicio'
      .query('UPDATE Tipo_Servicio SET servicio = @servicio WHERE id_tipo_servicio = @id_tipo_servicio'); // Corregido: tabla

    res.json({
      success: true,
      data: {
        id_tipo_servicio: parseInt(id_tipo_servicio),
        servicio
      },
      message: 'Tipo de servicio actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar tipo de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de servicio',
      details: error.message
    });
  }
});

router.delete('/:id_tipo_servicio', validateTipoServicioId, async (req, res) => {
  try {
    const { id_tipo_servicio } = req.params;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .query('SELECT servicio FROM Tipo_Servicio WHERE id_tipo_servicio = @id_tipo_servicio');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de servicio no encontrado' // Mensaje corregido
      });
    }

    await pool.request()
      .input('id_tipo_servicio', sql.Int, id_tipo_servicio)
      .query('DELETE FROM Tipo_Servicio WHERE id_tipo_servicio = @id_tipo_servicio');

    res.json({
      success: true,
      message: 'Tipo de servicio eliminado exitosamente',
      id_tipo_servicio: parseInt(id_tipo_servicio) // Corregido la propiedad del objeto
    });
  } catch (error) {
    console.error('Error al eliminar el tipo de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el tipo de servicio',
      details: error.message
    });
  }
});

export default router;