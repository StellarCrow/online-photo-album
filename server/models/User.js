const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    albums: [ {type: Schema.Types.ObjectId, ref: 'Album'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Photo'}]
})


module.exports = mongoose.model('User', UserSchema);