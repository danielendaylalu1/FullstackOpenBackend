const users = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

users.get("/", async (req, res) => {
  try {
    const result = await User.find({}).populate("blogs", { user: 0 });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

users.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(400).json({
        error: "password or username not correct",
      });
    }
    if (password.length < 3) {
      return res.status(400).json({
        error: "password is too short",
      });
    }

    const forTocken = {
      username: user.username,
      id: user._id,
    };

    const tocken = jwt.sign(forTocken, process.env.SECRET);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, 10);
    const newuser = new User({
      username,
      name,
      passwordHash,
    });
    const newUser = await newuser.save();
    res
      .status(201)
      .json({ tocken, username: newUser.username, name: newUser.name });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

users.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "password or username not correct",
      });
    }

    const forTocken = {
      username: user.username,
      id: user._id,
    };

    const tocken = jwt.sign(forTocken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    res.status(200).json({ tocken, username: user.username, name: user.name });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = users;
