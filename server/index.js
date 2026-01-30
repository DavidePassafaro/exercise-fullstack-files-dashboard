const express = require("express");
const mongoose = require("mongoose");
require("./models/User");

const dbName = "csv_dashboard";
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log(`Connesso al database: ${dbName}`))
  .catch((err) => console.log(err));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing
app.use(express.json());

// CORS
app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:4200";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Use authentication routes
require("./routes/authRoutes")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
