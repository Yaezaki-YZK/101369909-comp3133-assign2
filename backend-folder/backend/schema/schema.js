const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee]!
    getEmployeeById(_id: ID!): Employee
    getAllUsers: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
    updateEmployee(_id: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee!
    deleteEmployeeById(_id: ID!): Employee!
  }
`;

module.exports = typeDefs;
