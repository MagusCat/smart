//routes/inscripciones
import { Router } from 'express'; 
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validaciones
const validateInscripcionData = (req, res, next) => {
  const { num_placa, fecha_emision, Id_departamento, Id_propietario, Id_vehiculo } = req.body;
  const errors = [];

  if (!num_placa || typeof num_placa !== 'string') {
    errors.push('La num_placa es requerida y debe ser texto');
  } else if (num_placa.length > 22) {
    errors.push('La num_placa no puede exceder 22 caracteres');
  }

  if (!fecha_emision || isNaN(Date.parse(fecha_emision))) {
    errors.push('La fecha_emision es requerida y debe ser una fecha válida');
  }

  if (Id_departamento !== null && (isNaN(Id_departamento) || Id_departamento < 0)) {
    errors.push('Id_departamento debe ser un número válido o null');
  }

  if (Id_propietario !== null && (isNaN(Id_propietario) || Id_propietario < 0)) {
    errors.push('Id_propietario debe ser un número válido o null');
  }

  if (Id_vehiculo !== null && (isNaN(Id_vehiculo) || Id_vehiculo < 0)) {
    errors.push('Id_vehiculo debe ser un número válido o null');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateInscripcionId = (req, res, next) => {
  const { Id_inscripcion } = req.params;
  if (!Id_inscripcion || isNaN(Id_inscripcion)) {
    return res.status(400).json({ error: 'ID de inscripción inválido' });
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
    const count = await pool.request().query('SELECT COUNT(*) AS total FROM Inscripcion');
    const total = count.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT Id_inscripcion, num_placa, fecha_emision, Id_departamento, Id_propietario, Id_vehiculo
        FROM Inscripcion
        ORDER BY Id_inscripcion
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

    res.json({ success: true, data: result.recordset, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener inscripciones', details: error.message });
  }
});

// GET por ID
router.get('/:Id_inscripcion', validateInscripcionId, async (req, res) => {
  try {
    const { Id_inscripcion } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('Id_inscripcion', sql.Int, Id_inscripcion)
      .query('SELECT * FROM Inscripcion WHERE Id_inscripcion = @Id_inscripcion');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Inscripción no encontrada' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener inscripción', details: error.message });
  }
});

// POST
router.post('/', validateInscripcionData, async (req, res) => {
  try {
    const { num_placa, fecha_emision, Id_departamento, Id_propietario, Id_vehiculo } = req.body;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('num_placa', sql.NVarChar(22), num_placa)
      .input('fecha_emision', sql.Date, fecha_emision)
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .input('Id_propietario', sql.Int, Id_propietario)
      .input('Id_vehiculo', sql.Int, Id_vehiculo)
      .query(`
        INSERT INTO Inscripcion (num_placa, fecha_emision, Id_departamento, Id_propietario, Id_vehiculo)
        OUTPUT INSERTED.Id_inscripcion
        VALUES (@num_placa, @fecha_emision, @Id_departamento, @Id_propietario, @Id_vehiculo)
      `);

    res.status(201).json({
      success: true,
      data: {
        Id_inscripcion: result.recordset[0].Id_inscripcion,
        num_placa,
        fecha_emision,
        Id_departamento,
        Id_propietario,
        Id_vehiculo
      },
      message: 'Inscripción creada exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear inscripción', details: error.message });
  }
});

// PUT
router.put('/:Id_inscripcion', validateInscripcionId, validateInscripcionData, async (req, res) => {
  try {
    const { Id_inscripcion } = req.params;
    const { num_placa, fecha_emision, Id_departamento, Id_propietario, Id_vehiculo } = req.body;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('Id_inscripcion', sql.Int, Id_inscripcion)
      .query('SELECT 1 FROM Inscripcion WHERE Id_inscripcion = @Id_inscripcion');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Inscripción no encontrada' });
    }

    await pool.request()
      .input('Id_inscripcion', sql.Int, Id_inscripcion)
      .input('num_placa', sql.NVarChar(22), num_placa)
      .input('fecha_emision', sql.Date, fecha_emision)
      .input('Id_departamento', sql.SmallInt, Id_departamento)
      .input('Id_propietario', sql.Int, Id_propietario)
      .input('Id_vehiculo', sql.Int, Id_vehiculo)
      .query(`
        UPDATE Inscripcion
        SET num_placa = @num_placa,
            fecha_emision = @fecha_emision,
            Id_departamento = @Id_departamento,
            Id_propietario = @Id_propietario,
            Id_vehiculo = @Id_vehiculo
        WHERE Id_inscripcion = @Id_inscripcion
      `);

    res.json({ success: true, message: 'Inscripción actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar inscripción', details: error.message });
  }
});

// DELETE
router.delete('/:Id_inscripcion', validateInscripcionId, async (req, res) => {
  try {
    const { Id_inscripcion } = req.params;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('Id_inscripcion', sql.Int, Id_inscripcion)
      .query('SELECT 1 FROM Inscripcion WHERE Id_inscripcion = @Id_inscripcion');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Inscripción no encontrada' });
    }

    await pool.request()
      .input('Id_inscripcion', sql.Int, Id_inscripcion)
      .query('DELETE FROM Inscripcion WHERE Id_inscripcion = @Id_inscripcion');

    res.json({ success: true, message: 'Inscripción eliminada exitosamente', Id_inscripcion: parseInt(Id_inscripcion) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar inscripción', details: error.message });
  }
});

export default router;
