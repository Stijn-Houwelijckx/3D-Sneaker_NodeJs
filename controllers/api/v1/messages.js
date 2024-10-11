const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {
  const user = req.body.message.user;
  const text = req.body.message.text;

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

module.exports = {
  create,
  index,
};
