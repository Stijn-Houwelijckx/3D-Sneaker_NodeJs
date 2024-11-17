const User = require("../models/api/v1/User");

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
        res.status(201).json({
          status: "success",
          data: { user: user },
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
          status: "error",
          message: "Invalid credentials",
        });
      }

      // If user is found
      res.status(200).json({
        status: "success",
        data: { user: user },
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
};
