const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let LikeSchema = new Schema({
  photo: { type: Schema.Types.ObjectId, ref: "Photo", required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }]
});

module.exports = mongoose.model("Like", LikeSchema);
