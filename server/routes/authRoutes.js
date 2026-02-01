const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send("User already exists");
      }

      // Create new user
      const user = new User({ name, email, password });
      await user.save();

      // Send response
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).send({ message: "User not found" });
      }

      // Check if password is correct
      const isPasswordValid = await existingUser.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid password");
      }

      // Set cookie (a real app should use JWT)
      res.cookie("token", existingUser._id.toString(), {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/", // Assicura che sia visibile in tutta l'app
        maxAge: 24 * 60 * 60 * 1000, // 24 ore di validità
      });

      // Send response
      res.status(200).send({ message: "User logged in successfully" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  app.post("/auth/logout", (req, res) => {
    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).send({ message: "User logged out successfully" });
  });
};
