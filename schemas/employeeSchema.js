const { gql } = require("apollo-server-express");

const employeeTypeDefs = gql`
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
    searchEmployeeByDesignationOrDepartment(
      designation: String
      department: String
    ): [Employee]
  }

  type Mutation {
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String
      designation: String!
      salary: Float!
      date_of_joining: String!
      department: String!
      employee_photo: String
    ): Employee
    updateEmployee(
      eid: ID!
      first_name: String
      last_name: String
      email: String
      designation: String
      salary: Float
      employee_photo: String
    ): Employee
    deleteEmployee(eid: ID!): Employee
  }
`;

module.exports = employeeTypeDefs;


