const { User, Product, Order, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("orders");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate([
        { path: "orders" },
        { path: "cart", populate: { path: "productId", model: "Product" } },
      ]);
    },
    products: async () => {
      return Product.find();
    },
    product: async (_, { productId }) => {
      return Product.findOne({ _id: productId });
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
    order: async (_, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate("orders");

          if (!user) {
            throw new Error("User not found");
          }

          return user.orders;
        } else {
          throw new AuthenticationError("User not authenticated");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch orders");
      }
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
  },
};

module.exports = resolvers;
