const router = require("express").Router();
// const Post = require("../models/Post");
const User = require("../models/User");
const Album = require("../models/Album");

// add album to overall user db
router.post('/', async (req, res) => {
    console.log("trying");
    const newAlbum = new Album(req.body)
    try{
        const savedAlbum = await newAlbum.save();
        res.status(200).json(savedAlbum)
    } catch(err) {
        res.status(500).json(err);
    }
})

// update album
router.put("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        // if (album.userData.userId === req.body.userData.userId) {
            await album.updateOne({$set:req.body});
            res.status(200).json("the album has been updated")
        // } else {
            // res.status(403).json("you can only update albums in your database")
        // }
    } catch(err) {
        res.status(500).json(err)
    }  
})

// get album
router.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).json(album);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get all user's albums
router.get("/userdb/:userId", async (req, res) => {
    // let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId)
        const userAlbums = await Album.find({ userId:currentUser._id})
        // console.log(currentUser.email);
        res.json(userAlbums)
        // res.send(req.body._id)
        // res.send(currentUser.value)
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;