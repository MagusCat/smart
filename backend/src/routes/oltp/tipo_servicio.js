import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();

// GET todos los tipos de servicio con paginación
router.get('/get', async (req, res) => {
  try {
    const pool = await getConnection();

    // Obtener datos paginados
    const result = await pool.request()

      .query(`
        SELECT id_tipo_servicio, servicio
        FROM Tipo_Servicio
        ORDER BY servicio
      `);

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error('Error al obtener el tipo de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de servicio',
      details: error.message
    });
  }
});

export default router;