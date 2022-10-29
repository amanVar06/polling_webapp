const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  question: String,
  options: [optionSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Poll", pollSchema);
