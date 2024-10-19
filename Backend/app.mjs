import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
// import path from "path";
// import { fileURLToPath } from 'url';

// import pool from "pg";
import pool from "./db/database.mjs";
import XLSX from "xlsx";

const app = express();

app.use(cors({origin: 'http://localhost:5173' }));


app.use(express.json({ limit: '50mb' })); // Adjust size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import router from "./routers/allRoutes.mjs";
// import { uploadFile } from "./controllers/pipelineControllers.mjs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/Conference_Papers');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB file size limit
  });
  




//routes declaration
app.use("/api", router);


export { app };
