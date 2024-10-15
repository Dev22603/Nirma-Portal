import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"))
// app.use(cookieParser())

//routes import
import router from "./routers/allRoutes.mjs";
import { uploadFile } from "./controllers/pipelineControllers.mjs";

//routes declaration
app.use("/api", router);
app.post('/api/upload', uploadFile);

export { app };
