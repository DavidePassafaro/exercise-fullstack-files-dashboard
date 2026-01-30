const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.get("/users/me", async (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.findById(token);
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    res.status(200).send(user);
  });
};
