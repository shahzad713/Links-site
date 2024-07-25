// routes.js
const express = require("express");
const router = express.Router();
const { Job } = require("./db");

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update views for a job
router.put("/jobs/:id/views", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job
router.post("/jobs", async (req, res) => {
  const { name, category, createdAt, views, link } = req.body;
  try {
    const job = new Job({ name, category, createdAt, views, link });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/jobs/:id", async (req, res) => {
  const { name, category } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
