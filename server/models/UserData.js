const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        // userId: {
        //     type: String,
        //     required: true
        // },
        // releaseSpotifyId: {
        //     type: String,
        //     required: true
        // },
        dateLogged: {
            type:Date
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