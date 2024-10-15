import { Router } from "express";

import { getFilteredData,getColumns } from "../controllers/allControllers.mjs";
import { exportData, uploadFile } from "../controllers/pipelineControllers.mjs";

const router = Router();

// Conference Paper route with filters
router.get("/conferencePaper", getFilteredData);
router.get("/conferencePaper/columns", getColumns);
router.post("/uploadConferencePaper", uploadFile);
router.post("/conferencePaper/export",exportData);

export default router;
