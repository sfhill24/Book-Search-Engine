const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }

  type Query {
    user(_id: ID, username: String): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, password: String!, email: String!): User
  }
`;

module.exports = typeDefs;
