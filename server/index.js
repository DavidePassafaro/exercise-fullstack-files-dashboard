const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Mongoose models
require("./models/User");
require("./models/File");

// Database connection
const dbName = "csv_dashboard";
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log(`Connesso al database: ${dbName}`))
  .catch((err) => console.log(err));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Enable JSON body parsing
app.use(express.json());

// Enable cookie parsing
app.use(cookieParser());

// CORS
app.use((req, res, next) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:4200";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Routes
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/fileRoutes")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
