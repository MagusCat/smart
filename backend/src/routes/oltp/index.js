import express from "express";
import propietarioRouters from "./propietario.js"
const router = express.Router();

router.use("/propietarios/", propietarioRouters);
import tiposPropietariosRoutes from "./tipo_propietario.js"
import vehiculoRoutes from "./vehiculo.js"
const router = express.Router();

router.use("/propietarios/", propietarioRouters);
router.use("/tipos_propietarios/", tiposPropietariosRoutes)
router.use("/vehiculos/", vehiculoRoutes)

export default router;