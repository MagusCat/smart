import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();

// GET con paginación
router.get("/get", async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
        SELECT Id_departamento, departamento, siglas
        FROM Departamento
        ORDER BY Id_departamento
      `);

    res.json({ success: true, data: result.recordset });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error al obtener departamentos",
        details: error.message,
      });
  }
});

export default router;
