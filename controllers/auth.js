const User = require("../models/api/v1/User");

const signup = async (req, res) => {
  const { name, email, password } = req.body.user;

  const user = new User({ email: email, name: name });
  await user.setPassword(password);
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
};

module.exports.signup = signup;
