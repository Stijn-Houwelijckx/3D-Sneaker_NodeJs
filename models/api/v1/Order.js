const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      houseNr: { type: String, required: true },
      zipcode: { type: String, required: true },
      city: { type: String, required: true },
    },
  },
  sneaker: {
    parts: [
      {
        partName: { type: String, required: true },
        color: { type: String, default: "white" },
        material: { type: String, default: "default" },
      },
    ],
  },
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "In production", "Shipped", "Completed"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
