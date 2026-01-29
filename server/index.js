const express = require("express");
const mongoose = require("mongoose");

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

// Use authentication routes
require("./routes/authRoutes")(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
