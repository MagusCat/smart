import { sql, getConnection } from "../../config/db_oltp.js";
import express from "express";

const router = express.Router();
// Validaciones
const validateTipoPropietarioData = (req, res, next) => {
  const { propietario } = req.body;
  const errors = [];

  // Verificar existencia
  if (!propietario || typeof propietario !== "string") {
    errors.push("El tipo de propietario es requerido y debe ser texto");
  }

  // Verificar longitud solo si existe
  if (propietario && propietario.length > 50) {
    errors.push("El tipo no puede exceder 50 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false, // Agregado para consistencia
      errors,
    });
  }

  next();
};

const validateTipoPropietarioId = (req, res, next) => {
  const { id_tipo_propietario } = req.params;

  if (!id_tipo_propietario || isNaN(id_tipo_propietario)) {
    return res.status(400).json({
      success: false, // Agregado para consistencia
      error: "ID de tipo propietario inválido",
    });
  }

  next();
};

// GET todos los tipos de propietario con paginación
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();

    // Obtener total de registros
    const countResult = await pool
      .request()
      .query("SELECT COUNT(*) AS total FROM Tipo_Propietario");
    const total = countResult.recordset[0].total;

    // Obtener datos paginados
    const result = await pool.request().query(`
        SELECT id_tipo_propietario, propietario
        FROM Tipo_Propietario
        ORDER BY propietario
      `);

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error al obtener el tipo de propietario:", error);
    res.status(500).json({
      success: false,
      error: "Error al obtener el tipo de propietario",
      details: error.message,
    });
  }
});

// GET Tipo de proietario por ID
router.get(
  "/:id_tipo_propietario",
  validateTipoPropietarioId,
  async (req, res) => {
    try {
      const { id_tipo_propietario } = req.params;
      const pool = await getConnection();

      const result = await pool
        .request()
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .query(
          "SELECT id_tipo_propietario, propietario FROM Tipo_Combustible WHERE id_tipo_propietario = @id_tipo_propietario"
        );

      if (result.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          error: "tipo de propietario no encontrado",
        });
      }

      res.json({
        success: true,
        data: result.recordset[0],
      });
    } catch (error) {
      console.error("Error al obtener el tipo de propietario:", error);
      res.status(500).json({
        success: false,
        error: "Error al obtener el tipo de propietario",
        details: error.message,
      });
    }
  }
);

// POST agregar tipo de propietario
router.post("/", validateTipoPropietarioData, async (req, res) => {
  try {
    const { propietario } = req.body;
    const pool = await getConnection();

    // Verificar si el combustible ya existe
    const exists = await pool
      .request()
      .input("propietario", sql.NVarChar(50), propietario)
      .query("SELECT 1 FROM Tipo_Propietario WHERE propietario = @propietario");

    if (exists.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        error: "El tipo de propietario ya existe",
      });
    }

    const result = await pool
      .request()
      .input("propietario", sql.NVarChar(50), propietario)
      .query(
        "INSERT INTO Tipo_Propietario (propietario) OUTPUT INSERTED.id_tipo_propietario VALUES (@propietario)"
      );

    res.status(201).json({
      success: true,
      data: {
        id_tipo_propietario: result.recordset[0].id_tipo_propietario,
        propietario,
      },
      message: "Tipo de propietario agregado exitosamente",
    });
  } catch (error) {
    console.error("Error al agregar el tipo de propietario:", error);
    res.status(500).json({
      success: false,
      error: "Error al agregar el tipo de propietario",
      details: error.message,
    });
  }
});

// PUT actualizar tipo de propietario
router.put(
  "/:id_tipo_combustible",
  validateTipoPropietarioId,
  validateTipoPropietarioData,
  async (req, res) => {
    try {
      const { id_tipo_propietario } = req.params;
      const { propietario } = req.body;
      const pool = await getConnection();

      // Verificar si el tipo de propietario existe
      const exists = await pool
        .request()
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .query(
          "SELECT propietario FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario"
        );

      if (exists.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Tipo de propietario no encontrado",
        });
      }

      // Verificar si el nuevo nombre ya existe
      const nameExists = await pool
        .request()
        .input("propietario", sql.NVarChar(50), propietario)
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .query(
          "SELECT 1 FROM Tipo_Combustible WHERE propietario = @propietario AND id_tipo_propietario != @id_tipo_propietario"
        );

      if (nameExists.recordset.length > 0) {
        return res.status(400).json({
          success: false,
          error: "El nombre del tipo de propietario ya está existe",
        });
      }

      await pool
        .request()
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .input("propietario", sql.NVarChar(50), propietario)
        .query(
          "UPDATE Tipo_Combustible SET propietario = @propietario WHERE id_tipo_propietario = @id_tipo_propietario"
        );

      res.json({
        success: true,
        data: {
          id_tipo_propietario: parseInt(id_tipo_propietario),
          propietario,
        },
        message: "Tipo de propietario actualizado exitosamente",
      });
    } catch (error) {
      console.error("Error al actualizar tipo de propietario:", error);
      res.status(500).json({
        success: false,
        error: "Error al actualizar tipo de propietario",
        details: error.message,
      });
    }
  }
);

// DELETE eliminar tipo de propietario
router.delete(
  "/:id_tipo_propietario",
  validateTipoPropietarioId,
  async (req, res) => {
    try {
      const { id_tipo_propietario } = req.params;
      const pool = await getConnection();

      // Verificar si el tipo de combustible existe
      const exists = await pool
        .request()
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .query(
          "SELECT propietario FROM Tipo_Propietario WHERE id_tipo_propietario = @id_tipo_propietario"
        );

      if (exists.recordset.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Tipo de propietario no encontrado",
        });
      }

      // Eliminar el tipo de propietario
      await pool
        .request()
        .input("id_tipo_propietario", sql.Int, id_tipo_propietario)
        .query(
          "DELETE FROM Tipo_Combustible WHERE id_tipo_propietario = @id_tipo_propietario"
        );

      res.json({
        success: true,
        message: "Tipo de propietario eliminado exitosamente",
        id_tipo_propietario: parseInt(id_tipo_propietario),
      });
    } catch (error) {
      console.error("Error al eliminar el tipo de propietario:", error);
      res.status(500).json({
        success: false,
        error: "Error al eliminar el tipo de propietario",
        details: error.message,
      });
    }
  }
);

export default router;
