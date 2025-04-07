# Employee Management API

This project is a GraphQL-based Employee Management API built using Node.js, Express, MongoDB, and Apollo Server. It provides functionalities for managing employees and user authentication.

## Features

- Employee CRUD operations (Create, Read, Update, Delete)
- User authentication (Signup & Login)
- GraphQL API using Apollo Server
- MongoDB for data storage
- Password hashing with bcrypt
- JWT-based authentication

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Apollo Server (GraphQL)
- bcryptjs (for password hashing)
- jsonwebtoken (JWT authentication)

## Project Structure

```
|-- middleware/auth.js
|-- models/ Employee.js/User.js
|-- resolvers/employee.js/user.js
|-- schemas/employeeSchema.js/userSchema.js
|-- utils/db.js
|-- server.js (Main file)
|-- .env
|-- .gitignore
|-- package.json
```

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- MongoDB Atlas

### Steps

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## GraphQL API Endpoints

Access the GraphQL at:

```
http://localhost:3000/graphql
```

### Example Queries

#### User Signup:

```graphql
mutation {
  signup(username: "jim", email: "jim@example.com", password: "password123") {
    username
    email
  }
}
```

#### User Login:

```graphql
query {
  login(email: "jim@example.com", password: "password123")
}
```

#### Get All Employees:

```graphql
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    department
    designation
  }
}
```

#### Add Employee:

```graphql
mutation {
  addEmployee(
    first_name: "Jo"
    last_name: "Doe"
    email: "jo.doe@example.com"
    gender: "Male"
    designation: "Software Engineer"
    salary: 50000
    date_of_joining: "2023-05-15"
    department: "IT"
  ) {
    _id
    first_name
    email
  }
}
```

#### Search Employee by ID:

```graphql
query {
  getEmployeeById(eid: "67b1345ac005f233da95482f") {
    first_name
    last_name
    email
    department
  }
}
```

#### Update Employee:

```graphql
mutation {
  updateEmployee(
    eid: "67ace8e1a0ae7198843257bb"
    first_name: "Joseph"
    salary: 76000
  ) {
    first_name
    salary
  }
}
```

#### Delete Employee:

```graphql
mutation {
  deleteEmployee(eid: "67b136dfc005f233da95483e") {
    _id
    first_name
  }
}
```

#### Search Employee by Department:

```graphql
query {
  searchEmployeeByDesignationOrDepartment(department: "IT") {
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### Search Employee by Designation:

```graphql
query {
  searchEmployeeByDesignationOrDepartment(designation: "Web Designer") {
    first_name
    last_name
    email
    designation
    department
  }
}
```
