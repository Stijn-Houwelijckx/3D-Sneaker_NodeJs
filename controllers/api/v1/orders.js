const Order = require("../../../models/api/v1/Order");

// Create a new order
const create = async (req, res) => {
  const { user, sneaker } = req.body.order;
  try {
    const order = new Order({ user, sneaker });
    await order.save();
    res.status(201).json({
      status: "success",
      data: {
        order: order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Failed to create order",
      error: err.message,
    });
  }
};

module.exports = {
  create,
};
