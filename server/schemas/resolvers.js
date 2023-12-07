const { User, Product, Order, Category, Review, Cart } = require("../models");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("orders").populate("cart");
    },
    user: async (_, { userId }) => {
      return User.findById(userId).populate([
        { path: "orders" },
        { path: "cart" },
      ]);
    },
    products: async () => {
      return Product.find().populate("reviews");
    },
    product: async (_, { productId }) => {
      return Product.findOne({ _id: productId }).populate("reviews");
    },
    categories: async () => {
      return Category.find();
    },
    category: async (_, { categoryId }) => {
      return Category.findOne({ _id: categoryId });
    },
    orders: async () => {
      return Order.find().populate("products");
    },
    order: async (_, { orderId }) => {
      return Order.findById(orderId);
    },
    reviews: async () => {
      return Review.find();
    },
    review: async (_, { reviewId }) => {
      return Review.findById(reviewId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([
          { path: "orders" },
          { path: "cart", populate: { path: "productId", model: "Product" } },
        ]);
      }
      throw AuthenticationError;
    },
  },
  Order: {
    products: async (parent) => {
      return parent.products.map((orderProduct) => ({
        product: orderProduct.product,
        quantity: orderProduct.quantity,
      }));
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addToCart: async (_, { productId, quantity }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);

          if (!user) {
            throw new Error("User not found");
          }

          const product = await Product.findById(productId);

          if (!product) {
            throw new Error("Product not found");
          }

          const cartItem = {
            product: {
              _id: product._id,
              name: product.name,
              quantity: quantity,
              price: product.price * quantity,
            },
          };

          user.cart.push(cartItem);

          return user;
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add to cart");
      }
    },
    removeFromCart: async (_, { productId }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);

          if (!user) {
            throw new Error("User not found");
          }

          const cartItemIndex = user.cart.producst.findIndex(
            (item) => item.product._id.toString() === productId
          );

          if (cartItemIndex === -1) {
            throw new Error("Product not found in the cart");
          }

          const removedCartItem = user.cart.splice(cartItemIndex, 1)[0];
          user.cart.totalAmount -= removedCartItem.price;
          await user.save();

          return removedCartItem;
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to remove from cart");
      }
    },
    clearCart: async (_, { userId }, context) => {
      try {
        if (context.user) {
          const user = findByIdAndUpdate(userId, {
            $set: { cart: [] },
          });

          if (!user) {
            throw new Error("User not found");
          }
          return user;
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to clear cart");
      }
    },
    createOrder: async (_, { userId }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(userId).populate("cart");

          if (!user) {
            throw new Error("User not found");
          }

          if (user.cart.length === 0) {
            throw new Error("User cart is empty");
          }

          const totalAmount = user.cart.reduce(
            (total, product) => total + product.price,
            0
          );

          const order = await Order.create({
            user: user._id,
            products: user.cart.map((product) => ({ product: product._id })),
            totalAmount,
          });

          user.cart = [];

          return order;
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to place order");
      }
    },
    addReview: async (_, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }

      const review = await Review.create({
        user: context.user._id,
        ...args,
      });

      return review;
    },
    deleteReview: async (_, { reviewId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }

      const review = await Review.findByIdAndDelete(reviewId);
      if (!review || review.user.toString() !== context.user._id.toString()) {
        throw new Error("Review not found or user is not the author");
      }

      return review;
    },
    updateReview: async (_, { reviewId, reviewInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }

      const review = await Review.findByIdAndUpdate(
        reviewId,
        { $set: reviewInput },
        { new: true }
      );
      if (!review) {
        throw new AuthenticationError("Review not found");
      }
    },
  },
};

module.exports = resolvers;
