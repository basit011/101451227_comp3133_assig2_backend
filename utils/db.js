const mongoose = require("mongoose");

// //Helper function to connect to MongoDB asychronously
const connectDB = async () => {
  try {
    console.log("Attempting to connect to DB");

    const DB_CONNECTION = process.env.DB_URI

    await mongoose.connect(DB_CONNECTION);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
  }
};

module.exports = connectDB;
