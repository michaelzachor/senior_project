const mongoose = require("mongoose");
const Track = require("./Track").schema;
const UserData = require("./UserData").schema;

const AlbumSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required:true
        },
        spotifyId: {
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
        title: {
            type:String,
            required:true
        },
        
        tracks: {
            type:[Track],
            required:true
        },
        /*
        trackNames: {
            type:[String],
            required:true
        },
        trackSpotifyIds: {
            type:[String],
            required:true
        },
        */
        img:{
            type:String
        },
        year: {
            type:Number
        },
        type: {
            type:String
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

module.exports = mongoose.model("Album", AlbumSchema)