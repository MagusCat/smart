import express from "express";
import propietarioRouters from "./propietario.js"
import tiposPropietariosRoutes from "./tipo_propietario.js"
import vehiculoRoutes from "./vehiculo.js"

import categoria from "./categorias.js"
import marca from "./marca.js"
import departamento from "./departamento.js"
import tipo_combustible from "./tipo_combustible.js"
import tipo_uso from "./tipo_uso.js"
import tipo_servicio from "./tipo_servicio.js"

const router = express.Router();

router.use("/propietarios/", propietarioRouters);
router.use("/tipos_propietarios/", tiposPropietariosRoutes)
router.use("/vehiculos/", vehiculoRoutes)
router.use("/categorias/", categoria)
router.use("/marcas/", marca)
router.use("/departamentos/", departamento)
router.use("/tipo-combustibles/", tipo_combustible)
router.use("/tipo-usos/", tipo_uso)
router.use("/tipo-servicios/", tipo_servicio)






export default router;