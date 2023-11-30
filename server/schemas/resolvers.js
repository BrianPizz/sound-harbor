const { User, Product, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("orders");
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate("orders");
    },
    products: async () => {
      return Product.find();
    },
    product: async (_, { productId }) => {
      return Product.findOne({ _id: productId });
    },
    orders: async () => {
      return Order.find().populate("products");
    },
    order: async (_, { orderId }) => {
      return Order.findOne({ _id: orderId }).populate("products");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
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
