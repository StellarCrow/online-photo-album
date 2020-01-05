const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Album', AlbumSchema);