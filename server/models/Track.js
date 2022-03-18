const mongoose = require("mongoose");
const UserData = require("./UserData").schema;

const TrackSchema = new mongoose.Schema( 
    {
        userId: {
            type:String,
            required:true
        },
        spotifyId: {
            type:String,
            required:true
        },
        title: {
            type:String,
            required:true
        },
        artistNames: {
            type:[String],
            required:true
        },
        artistSpotifyIds: {
            type:[String],
            required:true
        },
        albumSpotifyId: {
            type:String,
            required:true
        },
        marked: {
            type:Boolean,
            required:true,
            default:false
        },
        userData: {
            type:UserData,
            default: {}
        }
    },
    { timestamps:true }
);
/*
    {
        id: {
            type:String,
            required:true
        },
        artistNames: {
            type:[String],
            required:true
        },
        artistIds: {
            type:[String],
            required:true
        },
        title: {
            type:String,
            required:true
        },
        albumName: {
            type:String,
            required:true
        },
        albumId: {
            type:String,
            required:true
        },
        img:{
            type:String
        },
        year: {
            type:Number
        },
        marked: {
            type: Boolean,
            required: true,
            default: false
        },
        userData: {
            type: UserData,
            default: {}
        }
    },
    { timestamps:true }
);
*/

module.exports = mongoose.model("Track", TrackSchema)