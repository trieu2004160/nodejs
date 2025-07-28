// Kết nối MongoDB
const mongoose = require("mongoose");

const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://root:123456@localhost:27018", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB (test database) successfully!");
  } catch (error) {
    console.log("Database connection failed:", error);
    throw error;
  }
};

module.exports = mongoConnection;
