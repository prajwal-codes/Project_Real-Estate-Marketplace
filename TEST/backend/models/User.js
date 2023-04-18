const mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId},
    },
    {
        timestamps: true,
    }
)

var UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    gender: {type: String},
    phone: {type: String},
    pic: {type: String},
    posts: [PersonSchema]
});

module.exports = mongoose.model("user", UserSchema);