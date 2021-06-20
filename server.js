console.log("Welcome to 9jaPoll");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Import routes
const articleRoutes = require("./routes/article");

// DB import
const dbSetup = require("./db/connectDB");

// Port
const port = process.env.PORT || 5000;

// Connect to the database
dbSetup();

// CORS and expressJSON Middlewares
app.use(cors);
app.use(express.json());

// Dummy route
app.get("/dummy", (req, res) => {
  res.send("Welcome to 9jaPoll");
});

// use routes
app.use(articleRoutes);

// Listen
app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
