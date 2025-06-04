import express from "express";
import compareController from "../../controllers/olap/compareController.js";

const router = express.Router();

router.get("/categories", compareController.getCategories);
router.get("/times", compareController.getTimes);
router.post("/cross", compareController.cross);
router.post("/lines", compareController.compare);

export default router;