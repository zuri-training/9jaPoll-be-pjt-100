const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Error HAndler middleware
const errorHandler = require("./middlewares/errorHandler");

// Import routes
const articleRoutes = require("./routes/article");
const authRoutes = require("./routes/auth");
const aspirantRoutes = require("./routes/aspirantProfile");
const userRoutes = require("./routes/userProfile");

// DB import
const dbSetup = require("./db/connectDB");

// Port
const port = process.env.PORT || 5000;

// Connect to the database
dbSetup();

// init express
const app = express();

// CORS and expressJSON Middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Welcome to 9jaPoll...");
});

// use routes
app.use("/api/v1", articleRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", aspirantRoutes);
app.use("/api/v1", userRoutes);

// Error handler
app.use(errorHandler);

// Listen
app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
