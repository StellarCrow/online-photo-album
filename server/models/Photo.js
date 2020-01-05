const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  description: {
    type: String,
    required: false
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
  likes:[{ type: Schema.Types.ObjectId, ref: "User" }],
  link: {
      type: String,
      required: true
  },
  tags: [{type: String}]
});

module.exports = mongoose.model('Photo', PhotoSchema);