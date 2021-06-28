require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./db/connectDB');
const errorHandler = require('./middleware/error');

// connect to the database
connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/api/v1/aspirant', require('./routes/aspirant'));

// error handler middleware
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
