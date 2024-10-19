import { Router } from "express";

import { getFilteredData,getColumns } from "../controllers/allControllers.mjs";
import { exportData } from "../controllers/pipelineControllers.mjs";
import { uploadConferenceData } from "../controllers/pipelineControllers.mjs";
import multer from "multer";

const router = Router();


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

// Conference Paper route with filters
router.get("/conferencePaper", getFilteredData);
router.get("/conferencePaper/columns", getColumns);
router.post("/conferencePaper/export",exportData);
router.post('/upload-conference-data', upload.single('file'), uploadConferenceData); 


export default router;
