import { Router } from 'express';
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

const validateTipoPropietarioData = (req, res, next) => {
  const { propietario } = req.body;
  const errors = [];

  if (!propietario || typeof propietario !== 'string' || propietario.trim() === '') {
    errors.push('El tipo de propietario es requerido y debe ser texto');
  }

  if (propietario && propietario.length > 50) {
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

const validateTipoPropietarioId = (req, res, next) => {
  const { id_tipo_propietario } = req.params;

  if (!id_tipo_propietario || isNaN(parseInt(id_tipo_propietario))) {
    return res.status(400).json({
      success: false,
      error: 'ID de tipo propietario inválido'
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
      .query('SELECT COUNT(*) AS total FROM Tipo_Propietario');
    const total = countResult.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_tipo_propietario, propietario
        FROM Tipo_Propietario
        ORDER BY propietario
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
    console.error('Error al obtener los tipos de propietario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los tipos de propietario',
      details: error.message
    });
  }
});

router.get('/:id_tipo_propietario', validateTipoPropietarioId, async (req, res) => {
  try {
    const { id_tipo_propietario } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .query('SELECT id_tipo_propietario, propietario FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario');

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de propietario no encontrado'
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (error) {
    console.error('Error al obtener el tipo de propietario por ID:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de propietario',
      details: error.message
    });
  }
});

router.post('/', validateTipoPropietarioData, async (req, res) => {
  try {
    const { propietario } = req.body;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('propietario', sql.NVarChar(50), propietario)
      .query('SELECT 1 FROM Tipo_Propietario WHERE propietario = @propietario');

    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El tipo de propietario ya existe'
      });
    }

    const result = await pool.request()
      .input('propietario', sql.NVarChar(50), propietario)
      .query('INSERT INTO Tipo_Propietario (propietario) OUTPUT INSERTED.id_tipo_propietario VALUES (@propietario)');

    res.status(201).json({
      success: true,
      data: {
        id_tipo_propietario: result.recordset[0].id_tipo_propietario,
        propietario
      },
      message: 'Tipo de propietario agregado exitosamente'
    });
  } catch (error) {
    console.error('Error al agregar el tipo de propietario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar el tipo de propietario',
      details: error.message
    });
  }
});

router.put('/:id_tipo_propietario', validateTipoPropietarioId, validateTipoPropietarioData, async (req, res) => {
  try {
    const { id_tipo_propietario } = req.params;
    const { propietario } = req.body;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .query('SELECT propietario FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de propietario no encontrado'
      });
    }

    const nameExists = await pool.request()
      .input('propietario', sql.NVarChar(50), propietario)
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .query('SELECT 1 FROM Tipo_Propietario WHERE propietario = @propietario AND id_tipo_propietario != @id_tipo_propietario');

    if (nameExists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de propietario ya está en uso'
      });
    }

    await pool.request()
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .input('propietario', sql.NVarChar(50), propietario)
      .query('UPDATE Tipo_Propietario SET propietario = @propietario WHERE id_tipo_propietario = @id_tipo_propietario');

    res.json({
      success: true,
      data: {
        id_tipo_propietario: parseInt(id_tipo_propietario),
        propietario
      },
      message: 'Tipo de propietario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar tipo de propietario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de propietario',
      details: error.message
    });
  }
});

router.delete('/:id_tipo_propietario', validateTipoPropietarioId, async (req, res) => {
  try {
    const { id_tipo_propietario } = req.params;
    const pool = await poolOLTP;

    const exists = await pool.request()
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .query('SELECT propietario FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario');

    if (exists.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de propietario no encontrado'
      });
    }

    await pool.request()
      .input('id_tipo_propietario', sql.Int, id_tipo_propietario)
      .query('DELETE FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario');

    res.json({
      success: true,
      message: 'Tipo de propietario eliminado exitosamente',
      id_tipo_propietario: parseInt(id_tipo_propietario)
    });
  } catch (error) {
    console.error('Error al eliminar el tipo de propietario:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el tipo de propietario',
      details: error.message
    });
  }
});

export default router;