import express from "express";
import queryRouters from "./queryRoutes.js"
import testRouters from "./testRoutes.js"
import summaryRouters from "./summaryRoutes.js";
import compareRouters from "./compareRoutes.js";    

const router = express.Router();

router.use("/summary/", summaryRouters);
router.use("/query/", queryRouters);
router.use("/compare/", compareRouters);

router.use("/", testRouters)

export default router;