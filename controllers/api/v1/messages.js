const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {
  const user = req.body.message.user;
  const text = req.body.message.text;

  // Create a new message
  const m = new Message({ user: user, text: text });
  m.save().then(() => {
    res.json({
      status: "success",
      data: {
        message: m,
      },
    });
  });
};

// Get all messages
const index = async (req, res) => {
  // Find all messages
  const messages = await Message.find({});
  res.json({
    status: "success",
    data: {
      messages: messages,
    },
  });
};

// Get message by id
const show = async (req, res) => {
  const id = req.params.id;
  // Find message by id
  const message = await Message.findById(id);
  res.json({
    status: "success",
    data: {
      message: message,
    },
  });
};

module.exports = {
  create,
  index,
  show,
};
