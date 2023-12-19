import { gql } from "@apollo/client";

export const QUERY_CARTS = gql`
query Query {
    carts {
      _id
      user {
        _id
      }
      products {
        product {
          _id
          name
          image
        }
        quantity
        price
      }
      totalAmount
    }
  }
`;

export const QUERY_CART = gql`
  query Query($userId: ID!) {
    cart(userId: $userId) {
      _id
      user {
        _id
      }
      products {
        product {
          _id
          name
          image
        }
        quantity
        price
      }
      totalAmount
    }
  }
`;

