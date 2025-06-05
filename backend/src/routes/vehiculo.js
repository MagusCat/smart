// routes/tipoPropietario
import { Router } from 'express'; 
import { sql, poolOLTP } from '../database/db.js';

const router = Router();

// Validaciones
const validateVehiculoData = (req, res, next) => {
  const { placa, id_marca, id_modelo, id_color, id_propietario } = req.body;
  const errors = [];

  if (!placa || typeof placa !== 'string') {
    errors.push('La placa es requerida y debe ser texto');
  } else if (placa.length > 8) {
    errors.push('La placa no puede exceder 8 caracteres');
  }

  if (!id_marca || isNaN(id_marca)) {
    errors.push('El id_marca es requerido y debe ser un número');
  }

  if (!id_modelo || isNaN(id_modelo)) {
    errors.push('El id_modelo es requerido y debe ser un número');
  }

  if (!id_color || isNaN(id_color)) {
    errors.push('El id_color es requerido y debe ser un número');
  }

  if (!id_propietario || isNaN(id_propietario)) {
    errors.push('El id_propietario es requerido y debe ser un número');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateVehiculoId = (req, res, next) => {
  const { id_vehiculo } = req.params;
  if (!id_vehiculo || isNaN(id_vehiculo)) {
    return res.status(400).json({ error: 'ID de vehículo inválido' });
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
    const count = await pool.request().query('SELECT COUNT(*) AS total FROM Vehiculo');
    const total = count.recordset[0].total;

    const result = await pool.request()
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT id_vehiculo, placa, id_marca, id_modelo, id_color, id_propietario
        FROM Vehiculo
        ORDER BY id_vehiculo
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `);

    res.json({ success: true, data: result.recordset, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener vehículos', details: error.message });
  }
});

// GET por ID
router.get('/:id_vehiculo', validateVehiculoId, async (req, res) => {
  try {
    const { id_vehiculo } = req.params;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('id_vehiculo', sql.Int, id_vehiculo)
      .query('SELECT * FROM Vehiculo WHERE id_vehiculo = @id_vehiculo');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
    }

    res.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener vehículo', details: error.message });
  }
});

// POST
router.post('/', validateVehiculoData, async (req, res) => {
  try {
    const { placa, id_marca, id_modelo, id_color, id_propietario } = req.body;
    const pool = await poolOLTP;

    const result = await pool.request()
      .input('placa', sql.NVarChar(8), placa)
      .input('id_marca', sql.Int, id_marca)
      .input('id_modelo', sql.Int, id_modelo)
      .input('id_color', sql.Int, id_color)
      .input('id_propietario', sql.Int, id_propietario)
      .query(`
        INSERT INTO Vehiculo (placa, id_marca, id_modelo, id_color, id_propietario)
        OUTPUT INSERTED.id_vehiculo
        VALUES (@placa, @id_marca, @id_modelo, @id_color, @id_propietario)
      `);

    res.status(201).json({
      success: true,
      data: {
        id_vehiculo: result.recordset[0].id_vehiculo,
        placa,
        id_marca,
        id_modelo,
        id_color,
        id_propietario
      },
      message: 'Vehículo creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear vehículo', details: error.message });
  }
});

// PUT
router.put('/:id_vehiculo', validateVehiculoId, validateVehiculoData, async (req, res) => {
  try {
    const { id_vehiculo } = req.params;
    const { placa, id_marca, id_modelo, id_color, id_propietario } = req.body;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('id_vehiculo', sql.Int, id_vehiculo)
      .query('SELECT 1 FROM Vehiculo WHERE id_vehiculo = @id_vehiculo');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
    }

    await pool.request()
      .input('id_vehiculo', sql.Int, id_vehiculo)
      .input('placa', sql.NVarChar(8), placa)
      .input('id_marca', sql.Int, id_marca)
      .input('id_modelo', sql.Int, id_modelo)
      .input('id_color', sql.Int, id_color)
      .input('id_propietario', sql.Int, id_propietario)
      .query(`
        UPDATE Vehiculo
        SET placa = @placa, id_marca = @id_marca, id_modelo = @id_modelo,
            id_color = @id_color, id_propietario = @id_propietario
        WHERE id_vehiculo = @id_vehiculo
      `);

    res.json({ success: true, message: 'Vehículo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar vehículo', details: error.message });
  }
});

// DELETE
router.delete('/:id_vehiculo', validateVehiculoId, async (req, res) => {
  try {
    const { id_vehiculo } = req.params;
    const pool = await poolOLTP;

    const check = await pool.request()
      .input('id_vehiculo', sql.Int, id_vehiculo)
      .query('SELECT 1 FROM Vehiculo WHERE id_vehiculo = @id_vehiculo');

    if (check.recordset.length === 0) {
      return res.status(404).json({ success: false, error: 'Vehículo no encontrado' });
    }

    await pool.request()
      .input('id_vehiculo', sql.Int, id_vehiculo)
      .query('DELETE FROM Vehiculo WHERE id_vehiculo = @id_vehiculo');

    res.json({ success: true, message: 'Vehículo eliminado exitosamente', id_vehiculo: parseInt(id_vehiculo) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar vehículo', details: error.message });
  }
});

export default router;