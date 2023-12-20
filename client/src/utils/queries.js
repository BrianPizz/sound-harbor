import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
query Query {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CATEGORY = gql`
query Query($categoryId: ID!) {
    category(categoryId: $categoryId) {
      name
    }
  }
`;

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

export const QUERY_ORDERS = gql`
query Query {
    orders {
      _id
      cart {
        _id
      }
      totalAmount
      dateCreated
      user {
        _id
      }
    }
  }
`;


export const QUERY_ORDER = gql`
query Query($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      cart {
        _id
      }
      totalAmount
      dateCreated
      user {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
query Me {
    me {
      _id
      username
      email
    }
  }
`;
