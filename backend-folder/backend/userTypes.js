const { gql } = require('apollo-server-express');
const UserType = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
`;

module.exports = { UserType };