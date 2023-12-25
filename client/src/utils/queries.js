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

export const QUERY_PRODUCTS = gql`
query Query {
    products {
      _id
      name
      description
      image
      price
      stock
      reviews {
        _id
      }
      category {
        _id
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
query Query($productId: ID!) {
    product(productId: $productId) {
      _id
      category {
        _id
      }
      name
      description
      image
      price
      stock
      reviews {
        _id
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
query Query {
    review {
      _id
      product {
        _id
      }
      rating
      comment
      user {
        _id
      }
      date
    }
  }
`;

export const QUERY_REVIEW = gql`
query Query($reviewId: ID!) {
    review(reviewId: $reviewId) {
      _id
      product {
        _id
      }
      rating
      comment
      user {
        _id
      }
      date
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

export const QUERY_USERS = gql`
query Query {
    users {
      _id
      email
      username
    }
  }
`;

export const QUERY_USER = gql`
query Query($userId: ID!) {
    user(userId: $userId) {
      _id
      email
      username
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
