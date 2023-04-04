const mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
},
{
    timestamps: true,
});

module.exports = mongoose.model("user", UserSchema);