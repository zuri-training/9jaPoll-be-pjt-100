const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

// Signup
router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

module.exports = router;

