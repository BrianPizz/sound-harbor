const {
  User,
  Product,
  Order,
  Category,
  Review,
  Cart,
} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, { userId }) => {
      return User.findById(userId);
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
    carts: async () => {
      return Cart.find();
    },
    cart: async (_, { userId }) => {
      return Cart.findOne({ user: userId });
    },
    orders: async () => {
      return Order.find();
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
        return User.findById(context.user._id)
      } else {
        throw AuthenticationError;
      }
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
          const product = await Product.findById(productId);

          if (!user || !product) {
            throw Error("User or product not found");
          }

          const cartItem = {
            product: {
              _id: product._id,
              name: product.name,
            },
            quantity: quantity,
            price: product.price * quantity,
          };

          // update the user's cart
          const cart = await Cart.findOneAndUpdate(
            { user: user._id },
            {
              $push: { products: cartItem },
              $inc: { totalAmount: cartItem.price },
            },
            { new: true, upsert: true }
          );

          return cart;
        } else {
          throw Error("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw Error("Failed to add to cart");
      }
    },
    removeFromCart: async (_, { productId }, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);

          if (!user) {
            throw new Error("User not found");
          }

          // Find the user's cart
          const cart = await Cart.findOne({ user: user._id });

          if (!cart) {
            throw new Error("Cart not found");
          }

          console.log(
            "Product IDs in cart:",
            cart.products.map((item) => item._id.toString())
          );

          // Find the cart item index to remove
          const cartItemIndex = cart.products.findIndex(
            (item) => item._id.toString() === productId
          );

          if (cartItemIndex === -1) {
            throw new Error("Product not found in the cart");
          }

          // Remove the cart item
          cart.products.splice(cartItemIndex, 1);
          console.log(
            "Product IDs in cart:",
            cart.products.map((item) => item._id.toString())
          );

          // Update totalAmount based on the remaining items
          cart.totalAmount = cart.products.reduce(
            (total, product) => total + product.price,
            0
          );

          // Save the updated cart to the database
          await cart.save();
        } else {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to remove from cart");
      }
    },
    clearCart: async (_, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);
          if (!user) {
            throw new Error("User not found");
          }
          // Find the user's cart
          const cart = await Cart.findOne({ user: user._id });

          if (!cart) {
            throw new Error("Cart not found");
          }

          // Clear the user's cart
          cart.products = [];
          cart.totalAmount = 0;

          await cart.save();

          return user.cart;
        } else {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to clear cart");
      }
    },
    createOrder: async (_, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id);

          const cart = await Cart.findOne({ user: user._id });

          if (!cart) {
            throw new Error("User's cart not found");
          }

          if (cart.products.length === 0) {
            throw new Error("Cart is empty");
          }

          // Calculate total amount based on products in the cart
          const totalAmount = cart.products.reduce(
            (total, product) => total + product.price,
            0
          );

          const order = await Order.create({
            cart: cart,
            user: user._id,
            totalAmount,
          });

          // Clear the user's cart
          cart.products = [];
          cart.totalAmount = 0;
          await cart.save();

          return order;
        } else {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to place order");
      }
    },
    addReview: async (_, args, context) => {
      try {
        if (!context.user) {
          throw new Error("User not authenticated");
        }

        const review = await Review.create({
          user: context.user._id,
          product: args.productId,
          rating: args.rating,
          comment: args.comment,
        });

        const product = await Product.findByIdAndUpdate(
          args.productId,
          {
            $addToSet: {
              reviews: review._id,
            },
          },
          { new: true }
        );

        await product.save();

        return review;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add review");
      }
    },
    deleteReview: async (_, { reviewId }, context) => {
      try {
        if (!context.user) {
          throw new Error("User not authenticated");
        }

        const review = await Review.findByIdAndDelete(reviewId);
        if (!review || review.user.toString() !== context.user._id.toString()) {
          throw new Error("Review not found or user is not the author");
        }

        return review;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete review");
      }
    },
    updateReview: async (_, args, context) => {
      try {
        if (!context.user) {
          throw new Error("User not authenticated");
        }

        const review = await Review.findByIdAndUpdate(
          args.reviewId,
          { rating: args.rating, comment: args.comment },
          { new: true }
        );
        if (!review) {
          throw new Error("Review not found");
        }
        return review;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update review");
      }
    },
  },
};

module.exports = resolvers;
