const Article = require("../models/article");
const asyncWrapper = require("../middlewares/asyncWrapper");

// Article creation route
const createArticle = asyncWrapper(async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json({ msg: "Article created successfully", article });
});

// Fetch all articles route
const getAllArticles = asyncWrapper(async (req, res) => {
  let search = {};
  if (req.query.title) {
    search.title = req.query.title;
  }

  const articles = await Article.find(search);
  res.status(200).json({ msg: "Here are the articles", articles });
});

// Fetch recent articles
const recentArticles = asyncWrapper(async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 }).limit(3);

  res.json(articles);
});

// Get single article
const getSingleArticle = asyncWrapper(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return res.status(404).json({ msg: "Article does not exist" });
  }

  res.status(200).json({ msg: "Here is the article", article });
});

// Update article
const updateArticle = asyncWrapper(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!article) {
    return res.status(404).json({ msg: "Article not found" });
  }

  res.status(200).json({ msg: "Article updated", article });
});

// Delete article
const deleteArticle = asyncWrapper(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(404).json({ msg: "Article not found" });
  }
  res
    .status(200)
    .json({ msg: `Article with the id ${req.params.id} deleted!` });
});

module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  recentArticles,
  updateArticle,
  deleteArticle,
};
