const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Firstname, Lastname, Email, Password, Confirm Password,

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This validator function work on create and save.
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not match!",
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  username: {
    type: String,
    required:false,
  },
  gender: {
      type: String,
      enum: ["male", "female"],
      required:false,
  },
  profileImg: {
    type: String,
    required:false,
  },
  headerImg: {
    type: String,
  },
  education: [{type: Object, detail: {
    major: String,
    school: String,
    required:false,
  }}],
  hobbies: [{type: String, detail: {
    hobby: String,
    required:false,
  }}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware for encrypting password on pre save
userSchema.pre("save", async function (next) {
  // If password is not modify, return the next middleware and do nothing
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt in order to protect is against bruteforce attack
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

// Update the password updatedAt
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

// Compare the password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Create password reset token that we are sending to user
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
