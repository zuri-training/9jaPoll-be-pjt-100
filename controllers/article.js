const Article = require("../models/article");

// Article creation route
const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ msg: "Article created successfully", article });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Fetch all articles route
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json({ msg: "Here are the articles", articles });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Get single article
const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }

    res.status(200).json({ msg: "Here is the article", article });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Update article
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }

    res.status(200).json({ msg: "Article updated", article });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

// Delete article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: "Article not found" });
    }
    res
      .status(200)
      .json({ msg: `Article with the id ${req.params.id} deleted!` });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};
