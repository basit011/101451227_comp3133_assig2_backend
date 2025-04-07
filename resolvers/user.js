// // changed login to Mutation here and schemas/userSchema.js because the frontend was not letting me sign in.

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const User = require("../models/User");
require("dotenv").config();

const userResolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new GraphQLError("Invalid credentials", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return {
          message: "Login successful",
          email: user.email,
          token,
        };
      } catch (error) {
        console.error("Login Error:", error);
        throw new GraphQLError("Authentication failed", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },

    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new GraphQLError("User already exists", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        return {
          username: newUser.username,
          email: newUser.email,
        };
      } catch (error) {
        console.error("Signup Error:", error);
        throw new GraphQLError("Error signing up", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },
  },
};

module.exports = userResolvers;
