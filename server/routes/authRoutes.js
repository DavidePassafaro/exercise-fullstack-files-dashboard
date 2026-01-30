const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/auth/signup", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send("User already exists");
      }

      // Create new user
      const user = new User({ email, password });
      await user.save();

      // Send response
      res.status(201).send("User created successfully");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  app.get("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).send("User not found");
      }

      // Check if password is correct
      const isPasswordValid = existingUser.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
      }

      // Set cookie (a real app should use JWT)
      res.cookie("token", existingUser._id, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      // Send response
      res.status(200).send("User logged in successfully");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  app.get("/auth/logout", (req, res) => {
    // Clear cookie
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
  });
};
