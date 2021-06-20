const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article");

// Get all articles
router.get("/articles", getAllArticles);

// Get single article
router.get("/article", getSingleArticle);

// Update article
router.put("/article/:id", updateArticle);

// Delete article
router.delete("/article/:id", deleteArticle);

module.exports = router;
