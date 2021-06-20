const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: String,
  headerImage: String,
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  body: {
    type: String,
    required: [true, "Article body is required"],
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
