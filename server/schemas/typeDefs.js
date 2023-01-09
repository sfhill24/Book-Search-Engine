const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  input saveBook {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }


  type Query {
    me (_id: ID, username: String): User
  }

  type Auth {
    token: ID!
    user: User
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!, email: String!): Auth
    saveBook(input: saveBook): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
