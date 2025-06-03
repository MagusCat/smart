import express from "express";
import queryController from "../../controllers/olap/queryController.js";

const router = express.Router();

router.post("/", queryController.send);

export default router;