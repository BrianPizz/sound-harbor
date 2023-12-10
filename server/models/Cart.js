const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema({
  product: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    default: 0,
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
    default: 0,
  },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
