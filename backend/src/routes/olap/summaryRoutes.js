import express from "express";
import summaryController from "../../controllers/olap/summaryController.js";
import summaryCompareController from "../../controllers/olap/summaryCompareController.js";

const router = express.Router();

router.get("/", summaryController.getSummary);

router.get("/growth/monthly", summaryController.getGrowthMonthly);

router.get("/growth/quarterly", summaryController.getGrowthQuarterly);

router.get("/register/average/monthly", summaryController.getAverageMonthly);

router.get("/register/average/quarterly", summaryController.getAverageQuarterly);

router.get("/register/total", summaryController.getTotal);

router.get("/category/dim", summaryController.getCategories);

router.get("/category/time", summaryController.getTimes);

router.post("/compare-summary", summaryCompareController.getCompareSummary);

export default router;
