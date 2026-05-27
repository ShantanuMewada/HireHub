import express from "express";
import {applyJob,getJobApplications,} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply for job
router.post("/:jobId/apply", authMiddleware, applyJob);

router.get("/job/:jobId", authMiddleware, getJobApplications);

export default router;
