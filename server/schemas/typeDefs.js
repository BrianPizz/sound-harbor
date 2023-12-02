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
    reviews: [Review]
}

type Order {
    id: ID!
    user: [User]
    products: [Product]
    totalAmount: Float!
    date: String!
}

type Review {
    _id: ID!
    user: User!
    product: Product!
    rating: Float!
    comment: String!
    date: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    products: [Product]
    product(productId: ID!): Product
    categories: [Category]
    category(categoryId: ID!): Category
    orders: [Order]
    order(userId: ID!): Order  
    reviews: [Review]
    review(reviewId: ID!): Review
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToCart(productId: ID!): User
    removeFromCart(productId: ID!): User
    clearCart(userId: ID!): User
    createOrder(userId: ID!): Order
    addReview(productId: ID!, rating: Int!, comment: String!, date: String!): Review
    updateReview(reviewId: ID!, rating: Int!, comment: String!, date: String!): Review
    deletReview(reviewId: ID!): Review
}
`;

module.exports = typeDefs;
