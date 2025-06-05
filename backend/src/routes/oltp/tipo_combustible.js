import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
        SELECT id_tipo_combustible, combustible
        FROM Tipo_Combustible
        ORDER BY combustible
      `);

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error al obtener la marca:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener la marca",
      details: error.message,
    });
  }
});

export default router;