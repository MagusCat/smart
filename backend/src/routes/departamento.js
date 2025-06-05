// routes/departamento
import { Router } from 'express'; 
import { sql, poolOLTP } from '../database/db.js';

const router = Router()

// Validaciones
const validateDepartamentoData = (req, res, next) => {
  const { departamento, siglas } = req.body;
  const errors = [];

  if (departamento !== null && typeof departamento !== 'string') {
    errors.push('El campo "departamento" debe ser texto o null');
  } else if (departamento && departamento.length > 50) {
    errors.push('El campo "departamento" no puede exceder 50 caracteres');
  }

  if (siglas !== null && typeof siglas !== 'string') {
    errors.push('El campo "siglas" debe ser texto o null');
  } else if (siglas && siglas.length > 10) {
    errors.push('El campo "siglas" no puede exceder 10 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateDepartamentoId = (req, res, next) => {
  const { Id_departamento } = req.params;
  if (!Id_departamento || isNaN(Id_departamento)) {
    return res.status(400).json({ error: 'ID de departamento inválido' });
  }
  next();
};

// GET con paginación
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const pool = await poolOLTP;
    const count = await pool.request().query('SELECT COUNT(*) AS total FROM Departamento');
    const total = count.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT Id_departamento, departamento, siglas
        FROM Departamento
        ORDER BY Id_departamento
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

    res.json({ success: true, data: result.recordset, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener departamentos', details: error.message });
  }
});

// GET por ID
router.get('/:Id_departamento', validateDepartamentoId, async (req, res) => {
  try {
    const { Id_departamento } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .query('SELECT * FROM Departamento WHERE Id_departamento = @Id_departamento');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener departamento', details: error.message });
  }
});

// POST
router.post('/', validateDepartamentoData, async (req, res) => {
  try {
    const { departamento, siglas } = req.body;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('departamento', sql.NVarChar(50), departamento)
      .input('siglas', sql.NVarChar(10), siglas)
      .query(`
        INSERT INTO Departamento (departamento, siglas)
        OUTPUT INSERTED.Id_departamento
        VALUES (@departamento, @siglas)
      `);

    res.status(201).json({
      success: true,
      data: {
        Id_departamento: result.recordset[0].Id_departamento,
        departamento,
        siglas
      },
      message: 'Departamento creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear departamento', details: error.message });
  }
});

// PUT
router.put('/:Id_departamento', validateDepartamentoId, validateDepartamentoData, async (req, res) => {
  try {
    const { Id_departamento } = req.params;
    const { departamento, siglas } = req.body;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .query('SELECT 1 FROM Departamento WHERE Id_departamento = @Id_departamento');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }

    await pool.request()
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .input('departamento', sql.NVarChar(50), departamento)
      .input('siglas', sql.NVarChar(10), siglas)
      .query(`
        UPDATE Departamento
        SET departamento = @departamento,
            siglas = @siglas
        WHERE Id_departamento = @Id_departamento
      `);

    res.json({ success: true, message: 'Departamento actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar departamento', details: error.message });
  }
});

// DELETE
router.delete('/:Id_departamento', validateDepartamentoId, async (req, res) => {
  try {
    const { Id_departamento } = req.params;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .query('SELECT 1 FROM Departamento WHERE Id_departamento = @Id_departamento');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Departamento no encontrado' });
    }

    await pool.request()
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .query('DELETE FROM Departamento WHERE Id_departamento = @Id_departamento');

    res.json({ success: true, message: 'Departamento eliminado exitosamente', Id_departamento: parseInt(Id_departamento) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar departamento', details: error.message });
  }
});

export default router;