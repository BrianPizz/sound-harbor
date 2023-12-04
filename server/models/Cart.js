const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
  product: {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    quantity: Number,
    price: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = model("CartItem", CartItemSchema);

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [CartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
