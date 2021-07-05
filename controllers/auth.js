const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token function to avoid DRY (Do not repeat yourself.)
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, req, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(401).json({ message: "Incorrect email or password!" });
    }
    // Check if the user exist and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "incorrect email or password" });
    }
    // if good, send token to the user
    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    // 1. Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "There is no user with this email address" });
    }

    // 2. Generate the random reset signToken
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3. send back as email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\n If you didn't request for a password reset, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 mins)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res
        .status(500)
        .json({ message: "Error sending email, try latter" });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // 1. get user based on the Token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2. If token is not expire, set a new password
    if (!user) {
      return res.status(400).json({ message: "Token is invalid or expired" });
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3. update changePasswordAt for the current user

    // 4. Log the user in and send jwt
    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
};
