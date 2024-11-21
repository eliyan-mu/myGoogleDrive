const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const userArray = [{ name: "eliyan", password: "1234", id: "1" }];

//Login
router.post("/login", (req, res) => {
  const user = userArray.find((user) => user.name === req.body.name);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  if (user.password !== req.body.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  return res.status(200).json({ user: user, mesage: "loged in sucssefully" });
});

//Register
router.post("/register", (req, res) => {
  const user = userArray.find((user) => user.name === req.body.name);
  if (user) {
    return res.status(401).json({ error: "user already exicted" });
  }

  if (req.body.password.length < 3) {
    return res.status(401).json({ error: "Password is too short" });
  }

  const newUserFolder = path.join(__dirname, `../users/${req.body.name}`);
  fs.mkdirSync(newUserFolder);

  const newUser = {
    name: req.body.name,
    password: req.body.password,
    id: userArray.length + 1,
  };
  userArray.push(newUser);

  return res
    .status(200)
    .json({ user: newUser, mesage: "registered sucssesfully" });
});

module.exports = router;
