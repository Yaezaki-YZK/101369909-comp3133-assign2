const { gql } = require('apollo-server-express');
const EmployeeType = gql`
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }
`;

module.exports = { EmployeeType };
