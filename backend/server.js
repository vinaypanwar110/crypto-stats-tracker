import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import handlefunction from "./controllers/stats.js";
import handleDeviation from "./controllers/deviation.js";

import dbconnect from "./db/dbconnect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

dbconnect();

app.get("/stats", handlefunction);
app.get("/deviation",handleDeviation);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
