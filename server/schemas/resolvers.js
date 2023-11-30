const { User, Product, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getUsers: async (_, args, context) => {
            try {
                const users = await User.find({}).populate('orders');
                return users
            } catch (error) {
                console.error(error);
              }
        },
    },
    Mutation: {

    }
}

module.exports = resolvers; 