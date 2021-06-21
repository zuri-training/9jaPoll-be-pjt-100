const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
  },
  headerImg: {
    type: String,
    required: [true, "Header image is required"],
  },
  description: {
    type: String,
  },
  body: {
    type: String,
    required: [true, "Article body is required"],
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
