const mongoose = require("mongoose");

const aspirantProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    sex: {
      type: String,
      required: [true, "Sex is required"],
    },
    headerImg: {
      type: String,
      required: [true, "Header image is required"],
    },
    profileImg: {
      type: String,
      required: [true, "Profile picture is required"],
    },
    hobbies: {
      type: String,
      required: [true, "Hobbies is required"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
    },

    manifesto: {
      type: String,
      required: [true, "Manifesto is required"],
    },
  },
  { timestamps: true }
);

const AspirantProfile = mongoose.model("Aspirants", aspirantProfileSchema);

module.exports = AspirantProfile;
