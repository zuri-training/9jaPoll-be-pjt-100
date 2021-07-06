const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ msg: `Error! Try again.`, err });
};

module.exports = errorHandler;
