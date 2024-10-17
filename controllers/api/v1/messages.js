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
  // Find messages by username
  if (req.query.user) {
    const user = req.query.user;
    const messages = await Message.find({ user: user });
    res.json({
      status: "success",
      data: {
        messages: messages,
      },
    });
    return;
  }

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

// Update message by id
const update = async (req, res) => {
  const id = req.params.id;
  const user = req.body.message.user;
  const text = req.body.message.text;

  // Find message by id and update
  const message = await Message.findById(id);
  if (user) {
    message.user = user;
  }
  if (text) {
    message.text = text;
  }

  message.save().then(() => {
    res.json({
      status: "success",
      data: {
        message: message,
      },
    });
  });
};

// Delete message by id
const destroy = async (req, res) => {
  const id = req.params.id;
  // Find message by id and delete
  await Message.findByIdAndDelete(id);
  res.json({
    status: "success",
  });
};

module.exports = {
  create,
  index,
  show,
  update,
  destroy,
};
