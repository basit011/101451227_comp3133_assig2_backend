const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    username: String!
    email: String!
    created_at: String!
    updated_at: String!
  }

  type LoginResponse {
    message: String
    email: String
    token: String
  }

  # type Query {
  # login(email: String!, password: String!): LoginResponse
#   }

  type Mutation {
    login(email: String!, password: String!): LoginResponse
   
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
  }
`;

module.exports = userTypeDefs;
