import express from "express";
import testRoutes from "./routes/testRoutes.js";
import olapRoutes from "./routes/olap/index.js"

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }

    next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", testRoutes);
app.use("/api/olap/", olapRoutes);

export default app;