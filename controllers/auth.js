const User = require("../models/api/v1/User");
const jwt = require("jsonwebtoken");
const config = require("config");

// Signup controller
const signup = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body.user;

    // Ensure all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Check if password is strong enough
    if (password.length < 5) {
      return res.status(400).json({
        status: "error",
        message: "Password should be at least 5 characters long",
      });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Please enter a valid email",
      });
    }

    // Create new user with email and name
    const user = new User({ email: email, name: name });

    // Set password using passport-local-mongoose method
    await user.setPassword(password);

    // Save user to the database
    await user
      .save()
      .then((user) => {
        let token = jwt.sign(
          {
            uid: user._id,
            email: user.email,
          },
          config.get("jwt.secret")
        );

        res.status(201).json({
          status: "success",
          data: {
            token: token,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          message: "Could not create user",
          error: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body.user;

    // Ensure all fields are present
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all fields",
      });
    }

    // Authenticate user
    await User.authenticate()(email, password).then((user) => {
      // If user is not found
      if (user.user === false) {
        return res.status(400).json({
          status: "failed",
          message: "Login failed",
        });
      }

      // Generate token
      let token = jwt.sign(
        {
          uid: user.user._id,
          email: user.user.email,
        },
        config.get("jwt.secret")
      );
      // If user is found
      res.status(200).json({
        status: "success",
        data: {
          token: token,
        },
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};

// Change password controller
const changePassword = async (req, res) => {
  try {
    // Get user input
    const { oldPassword, newPassword } = req.body.user;

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    // Ensure all fields are present
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Please fill in all fields",
      });
    }

    // Get user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Verify old password
    await user.authenticate(oldPassword).then((result) => {
      if (!result) {
        return res.status(400).json({
          status: "error",
          message: "Old password is incorrect",
        });
      }
    });

    // Check if old password is the same as new password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        status: "error",
        message: "New password must be different from old password",
      });
    }

    // Check if password is strong enough
    if (newPassword.length < 5) {
      return res.status(400).json({
        status: "error",
        message: "Password should beat least 5 characters long",
      });
    }

    // Change password
    await user.changePassword(oldPassword, newPassword).then(() => {
      res.status(200).json({
        status: "success",
        message: "Password changed successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
  changePassword,
};
