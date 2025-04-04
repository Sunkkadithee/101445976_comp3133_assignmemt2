const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        message: String
        token: String
    }

    type Query {
        hello: String
        getAllEmployees: [Employee]
        getEmployeeById(eid: ID!): Employee
        searchEmployees(designation: String, department: String): [Employee]
    }

    input EmployeeInput {
        first_name: String!   # Changed to match MongoDB
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        addEmployee(input: EmployeeInput!): Employee
        updateEmployee(eid: ID!, input: EmployeeInput!): Employee
        deleteEmployee(eid: ID!): String
    }
`;

module.exports = typeDefs;

/*
I defined a User type and two mutations:
 signup(username, email, password): Creates a new user.
 login(email, password): Logs in an existing user and returns a token.
 */