const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
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
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
