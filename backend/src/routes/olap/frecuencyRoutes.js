import express from "express";
import frecuencyController from "../../controllers/olap/frecuencyController.js";

const router = express.Router();

router.get("/:dim", frecuencyController.getFrecuency);

export default router;