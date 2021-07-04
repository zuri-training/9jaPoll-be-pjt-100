const express = require("express");
const router = express.Router();

const {
  createAspirant,
  getAllAspirants,
  getSingleAspirant,
  recentAspirants,
  updateAspirant,
  deleteAspirant,
} = require("../controllers/aspirantProfile");

// Create article
router.post("/aspirant", createAspirant);

// Get all articles
router.get("/aspirants", getAllAspirants);

// Get single article
router.get("/aspirant/:id", getSingleAspirant);

// Get recent articles
router.get("/recentAspirants", recentAspirants);

// Update article
router.put("/aspirant/:id", updateAspirant);

// Delete article
router.delete("/aspirant/:id", deleteAspirant);

module.exports = router;
