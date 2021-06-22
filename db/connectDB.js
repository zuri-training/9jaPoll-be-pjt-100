const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log("Error Connecting DB: ", err);
    });
};

module.exports = connectDB;
