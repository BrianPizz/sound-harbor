import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_TO_CART = gql`
mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      _id
    }
  }
`;

export const CLEAR_CART = gql`
mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      _id
    }
  }
`;

export const CREATE_ORDER = gql`
mutation CreateOrder {
    createOrder {
      _id
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
mutation Mutation($productId: ID!, $rating: Int!, $comment: String!) {
    addReview(productId: $productId, rating: $rating, comment: $comment) {
      _id
    }
  }
`;