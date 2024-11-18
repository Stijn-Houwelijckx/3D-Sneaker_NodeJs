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

// Get all orders
const index = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").lean();

    // Remove unwanted fields like '__v' and '_id' from parts
    orders.forEach((order) => {
      delete order.__v;
      order.sneaker.parts.forEach((part) => {
        delete part._id;
      });
    });

    if (orders.length === 0) {
      res.status(204).json({
        status: "success",
        message: "No orders found",
        data: {
          orders: [],
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          orders: orders,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Unable to fetch orders",
      error: err.message,
    });
  }
};

module.exports = {
  create,
  index,
};
