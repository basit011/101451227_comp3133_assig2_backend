const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
require("dotenv").config();

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new GraphQLError("Authorization header missing", {
      extensions: { code: "Unauthorized" },
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new GraphQLError("Token missing", {
      extensions: { code: "Unauthorized" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new GraphQLError("Invalid or expired token", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
};

module.exports = authMiddleware;
