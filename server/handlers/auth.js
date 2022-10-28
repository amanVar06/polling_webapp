const User = require("../models/user");
const Poll = require("../models/poll");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, username } = user;

    res.json({ id, username });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      res.json({
        id,
        username,
      });
    } else {
      throw new Error("Invalid username or passoword");
    }
  } catch (err) {
    next(err);
  }
};
