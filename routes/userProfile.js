const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  recentUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userprofile.js");

// Signup
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
router.get("/users/newusers", recentUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;

