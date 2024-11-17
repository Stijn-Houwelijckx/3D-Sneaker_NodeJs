const User = require("../../../models/api/v1/User");

const create = (req, res) => {
  const { name, email, password } = req.body.user;

  // Create a new message
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

module.exports = {
  create,
};
