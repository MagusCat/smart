import {sql, getConnection} from "../../config/db_oltp.js"
import express from "express";

const router = express.Router();

const validatePropietarioData = (req, res, next) => {
  const { cedula, ruc } = req.body;
  const errors = [];

  if (!cedula || typeof cedula !== 'string') {
    errors.push('La cédula es requerida y debe ser texto');
  } else if (cedula.length > 22) {
    errors.push('La cédula no puede exceder 22 caracteres');
  }

  if (!ruc || typeof ruc !== 'string') {
    errors.push('El RUC es requerido y debe ser texto');
  } else if (ruc.length > 22) {
    errors.push('El RUC no puede exceder 22 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validatePropietarioId = (req, res, next) => {
  const { id_propietario } = req.params;
  if (!id_propietario || isNaN(id_propietario)) {
    return res.status(400).json({ error: 'ID de propietario inválido' });
  }
  next();
};

// GET con paginación
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const pool = await getConnection();
    const count = await pool.request().query('SELECT COUNT(*) AS total FROM Propietario');
    const total = count.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_propietario, cedula, ruc, propietario
        FROM Propietario
        LEFT JOIN Tipo_Propietario ON Propietario.id_tipo_propietario = Tipo_Propietario.id_tipo_propietario
        ORDER BY id_propietario
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

    res.json({ success: true, data: result.recordset, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: 'Error al obtener propietarios', details: error.message });
  }
});

// GET por ID
router.get('/:id_propietario', validatePropietarioId, async (req, res) => {
  try {
    const { id_propietario } = req.params;
    const pool = await getConnection();

    const result = await pool.request()
      .input('id_propietario', sql.Int, id_propietario)
      .query('SELECT * FROM Propietario WHERE id_propietario = @id_propietario');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Propietario no encontrado' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener propietario', details: error.message });
  }
});

// POST
router.post('/', validatePropietarioData, async (req, res) => {
  try {
    const { cedula, ruc, id_tipo_propietario } = req.body;
    const pool = await getConnection();

    const result = await pool.request()
      .input('cedula', sql.NVarChar(22), cedula)
      .input('ruc', sql.NVarChar(22), ruc)
      .input('id_tipo_propietario', sql.SmallInt, id_tipo_propietario)
      .query(`
        INSERT INTO Propietario (cedula, ruc, id_tipo_propietario)
        OUTPUT INSERTED.id_propietario
        VALUES (@cedula, @ruc, @id_tipo_propietario)
      `);

    res.status(201).json({ success: true, data: { id_propietario: result.recordset[0].id_propietario, cedula, ruc }, message: 'Propietario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear propietario', details: error.message });
  }
});

// PUT
router.put('/:id_propietario', validatePropietarioId, validatePropietarioData, async (req, res) => {
  try {
    const { id_propietario } = req.params;
    const { cedula, ruc, id_tipo_propietario } = req.body;
    const pool = await getConnection();

    const check = await pool.request().input('id_propietario', sql.Int, id_propietario)
      .query('SELECT 1 FROM Propietario WHERE id_propietario = @id_propietario');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Propietario no encontrado' });
    }

    await pool.request()
      .input('id_propietario', sql.Int, id_propietario)
      .input('cedula', sql.NVarChar(22), cedula)
      .input('ruc', sql.NVarChar(22), ruc)
      .input('id_tipo_propietario', sql.SmallInt, id_tipo_propietario)
      .query(`
        UPDATE Propietario SET cedula = @cedula, ruc = @ruc, id_tipo_propietario = @id_tipo_propietario
        WHERE id_propietario = @id_propietario
      `);

    res.json({ success: true, message: 'Propietario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar propietario', details: error.message });
  }
});

// DELETE
router.delete('/:id_propietario', validatePropietarioId, async (req, res) => {
  try {
    const { id_propietario } = req.params;
    const pool = await getConnection();

    const check = await pool.request().input('id_propietario', sql.Int, id_propietario)
      .query('SELECT 1 FROM Propietario WHERE id_propietario = @id_propietario');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Propietario no encontrado' });
    }

    await pool.request()
      .input('id_propietario', sql.Int, id_propietario)
      .query('DELETE FROM Propietario WHERE id_propietario = @id_propietario');

    res.json({ success: true, message: 'Propietario eliminado exitosamente', id_propietario: parseInt(id_propietario) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar propietario', details: error.message });
  }
});

export default router;