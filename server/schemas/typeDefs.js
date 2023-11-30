const typeDefs = `
type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    orders: [Order]
}

type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    image: String!
}

type Order {
    id: ID!
    user: [User]
    products: [Product]
    totalAmount: Float!
    date: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    getUsers: [User]
}

type Mutation {
    addUser: Auth
}
`;

module.exports = typeDefs;
