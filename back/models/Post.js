const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId},
        postName: {type: String},
        postMarks: {type: String},
        postAdmin: {type: String},
        userAddress: {type: String},
        fromAddress:{type: String},
        TokenCount:{type:String}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("post", PostSchema);