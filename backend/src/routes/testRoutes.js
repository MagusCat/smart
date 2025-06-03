import express from "express";
import testController from "../controllers/testController.js";

const router = express.Router();

router.get("/", testController.test);

export default router;