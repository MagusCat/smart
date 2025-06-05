import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();


router.get('/get', async (req, res) => {
  try {
    const pool = await getConnection();

    // Obtener datos paginados
    const result = await pool.request()
      .query(`
        SELECT id_tipo_uso, uso
        FROM tipo_Uso
        ORDER BY uso
      `);

    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('Error al obtener el tipo de uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el tipo de uso',
      details: error.message
    });
  }
});

export default router;