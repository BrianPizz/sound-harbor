const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    cart: [Product]
    orders: [Order]
}

type Product {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    quantity: Int
    image: String!
    reviews: [Review]
}

type Category {
    _id: ID!
    name: String!
}

type Order {
    _id: ID!
    user: [User]
    products: [OrderProduct]
    totalAmount: Float!
    dateCreated: String!
}

type OrderProduct {
    product: ID
    quantity: Int
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
    user(userId: ID!): User
    products: [Product]
    product(productId: ID!): Product
    categories: [Category]
    category(categoryId: ID!): Category
    orders: [Order]
    order(orderId: ID!): Order
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
    deleteReview(reviewId: ID!): Review
}
`;

module.exports = typeDefs;
