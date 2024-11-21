const express = require("express");
const router = express.Router();

const userArray = [{ name: "eliyan", password: "1234", id: "1" }];
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

module.exports = router;
