const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    headerImg: {
      type: String,
    },
    description: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "Article body is required"],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Articles", articleSchema);

module.exports = Article;
