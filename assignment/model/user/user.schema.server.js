var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String
    },
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;