const getAllArticles = (req, res) => {
  res.send("All Articels");
};

const getSingleArticle = (req, res) => {
  res.send("Single Articels");
};

const updateArticle = (req, res) => {
  res.send("Update article");
};

const deleteArticle = (req, res) => {
  res.send("Delete Article");
};

module.exports = {
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};
