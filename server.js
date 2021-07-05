const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
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

// Swagger documentation option guide
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "9japoll API Documentation",
      version: "1.0.0",
      description: "API Documentation for the 9japoll Web Application",
    },
    servers: [
      {
        url: "localhost:4000/api/v1/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

//Swagger specification
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Listen
app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
