import Application from "../models/Application.js";
import Job from "../models/Job.js";
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
  return res.status(400).json({
    message: "Invalid Job ID",
  });
}

    // Check job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
    });

    res.status(201).json({
      message: "Applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobApplications = async (req, res) =>{
  try {
    const jobId = req.params.jobId;
    
    const application = await Application.find({
      job:jobId,
    })
    .populate("candidate","name email role skills")
    .populate("job","title company");

    res.status(200).json({
      message:"Applications fetched successfully",
      count: application.length, 
      applications:application,
    });

  } catch (error) {
    res.status(500).json({
      message:error.message 
    })
  }
}