const users = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

users.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).json(result);
  } catch (error) {}
});

users.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      name,
      passwordHash,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = users;
