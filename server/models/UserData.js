const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        releaseId: {
            type: String,
            required: true
        },
        rating: {
            type: Number
        },
        tags: {
            type: [String]
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("UserData", UserDataSchema)