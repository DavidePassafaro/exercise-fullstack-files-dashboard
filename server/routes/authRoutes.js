module.exports = (app) => {
  app.get("/auth/signup", (req, res) => {
    res.send("Signup");
  });

  app.get("/auth/login", (req, res) => {
    res.send("Login");
  });

  app.get("/auth/logout", (req, res) => {
    res.send("Logout");
  });
};
