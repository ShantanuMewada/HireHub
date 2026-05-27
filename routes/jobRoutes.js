import express from "express";

import { createJob , getAllJobs , updateJob, deleteJob} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";
 
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create",authMiddleware,roleMiddleware("admin", "recruiter"),
  createJob
);

// Update Job
router.put("/:id",authMiddleware,roleMiddleware("admin", "recruiter"),updateJob);

// Delete Job
router.delete("/:id",authMiddleware,roleMiddleware("admin", "recruiter"),deleteJob);

router.get("/",getAllJobs);

export default router;