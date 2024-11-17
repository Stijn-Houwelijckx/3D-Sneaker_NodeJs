const User = require("../../../models/api/v1/User");

const create = (req, res) => {
  const { name, email, password } = req.body.user;

  // Create a new user
  const user = new User({ name: name, email: email, password: password });
  user
    .save()
    .then((savedUser) => {
      res.status(201).json({
        status: "success",
        data: {
          user: savedUser,
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
};

// Get all users
const index = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(204).json({
        status: "success",
        message: "No users found",
        data: {
          users: [],
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          users: users,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch users",
      error: err.message,
    });
  }
};

module.exports = {
  create,
  index,
};
