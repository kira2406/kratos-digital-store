const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes"); // Consolidated routes
const sequelize = require("./config/sequelize_db");
const mongoose = require("mongoose")

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

const connectToMongo = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

connectToMongo();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(helmet());

// API Routes
app.use("/api", routes);

// Default Route
app.use("/", (req, res) => {
  res.status(200).json({ message: "Kratos backend initialized" });
});

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

// Sync database and start server
// sequelize
//   .sync({ force: false, alter: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });
