const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Poll = require("../models/poll");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET);

    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({
        id,
        username,
        token,
      });
    } else {
      throw new Error("Invalid username or passoword");
    }
  } catch (err) {
    err.message = "Invalid Username/Password";
    next(err);
  }
};
