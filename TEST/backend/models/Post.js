const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId},
        postText: {type: String},
        postImage: {type: String},
        postType: {type: String},
        postCity:{type: String},
        postDistrict:{type: String},
        postState:{type: String},
        postAddress: {type: String},
        postYear: {type: String},
        postDimension: {type: String},
        postSqArea: {type: String},
        userAddress: {type: String},
        old_user:{type:String},
        price: {type : String},
        list: { type : String},
        tokenId: {type: String}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("post", PostSchema);