import express from "express";
import testController from "../../controllers/olap/testController.js";

const router = express.Router();

router.get("/test", testController.test);

export default router;