const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateformat");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    get: (date) => dateFormat(date),
  },
});

const Order = model("Order", orderSchema);

module.exports = Order;
