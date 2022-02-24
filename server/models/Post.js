const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        // userEmail:{
        //     type:String,
        //     required:true
        // },
        releaseType:{
            type:String,
            required:true
        },
        releaseTitle:{
            type:String,
            required:true
        },
        img:{
            type:String
        }
    },
    { timestamps:true }
);

module.exports = mongoose.model("Post", PostSchema)