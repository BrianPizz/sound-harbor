const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateformat');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true }
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    get: (date) => dateFormat(date)
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
