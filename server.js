const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./utils/db");
const User = require("./models/User");
const Employee = require("./models/Employee");
const userTypeDefs = require("./schemas/userSchema");
const employeeTypeDefs = require("./schemas/employeeSchema");
const userResolvers = require("./resolvers/user");
const employeeResolvers = require("./resolvers/employee");
const authMiddleware = require("./middleware/auth");
const cors = require("cors");


const app = express();


app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
connectDB();

const server = new ApolloServer({
  typeDefs: [userTypeDefs, employeeTypeDefs],
  resolvers: [userResolvers, employeeResolvers],
  context: ({ req }) => {
    try {
      const user = authMiddleware(req);
      return { user }; 
    } catch (error) {
      return {};
    }
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.send("Welcome to My API!");
  });

  // app.get("/api/employees", (req, res) => {
  //   res.json([
  //     { id: 1, name: "Alice" },
  //     { id: 2, name: "Bob" },
  //   ]);
  // });

  const SERVER_PORT = process.env.SERVER_PORT || 3000;
  app.listen(SERVER_PORT, () => {
    console.log("Server started");
    console.log("http://localhost:3000/");
  });
}



startServer();
