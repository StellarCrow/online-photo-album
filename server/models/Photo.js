const mongoose = require("mongoose");
const Vibrant = require("node-vibrant");

let Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  description: {
    type: String,
    required: false
  },
  likesCount: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  link: {
    type: String,
    required: true
  },
  date: { type: Date, required: true, default: Date.now },
  tags: [{ type: String }],
  colors: [{ type: String, default: "#fff" }],
  orientation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Photo", PhotoSchema);