import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {

    const {
      title,
      company,
      location,
      salary,
      description,
    } = req.body;

    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      recruiter: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {

    const jobs = await Job.find()
      .populate("recruiter", "name email role");

    res.status(200).json({
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {

    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      job.recruiter.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can update only your own jobs",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Job updated successfully",
      updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {

    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      job.recruiter.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You can delete only your own jobs",
      });
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};