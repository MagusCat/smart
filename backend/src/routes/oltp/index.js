import express from "express";
import propietarioRouters from "./propietario.js"
const router = express.Router();

router.use("/propietarios/", propietarioRouters);

export default router;