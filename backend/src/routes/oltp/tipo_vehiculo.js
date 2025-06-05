import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const pool = await getConnection();

    // Obtener datos paginados
    const result = await pool.request()
      .query(`
        SELECT id_tipo_vehiculo, vehiculo
        FROM Tipo_Vehiculo
        ORDER BY vehiculo
      `);

    res.json({
      success: true,
      data: result.recordset,
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

export default router;