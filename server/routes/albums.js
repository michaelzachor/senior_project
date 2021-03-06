const router = require("express").Router();
// const Post = require("../models/Post");
const User = require("../models/User");
const Album = require("../models/Album");
const cors = require('cors');

router.use(cors());

// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'https://warm-jelly-6d1ccf.netlify.app');
//     res.header(
//       "Access-Control-Allow-Headers",
//       // "Origin, X-Requested-With, Content-Type, Accept"
//       "*"
//     );
//     next();
// });
// check if working 
router.get('/', (req, res) => {
    res.send("Hello it's album routes"); //runs if we make a get request
});

// add album to overall user db
router.post('/', async (req, res) => {
    console.log("trying ", req.body.title);
    // Album.exists({spotifyId:req.body.spotifyId}, (err, res) => {
    //     if (err) {
    //         console.log("err ",req.body.title,err);
    //         // res.status(400).json(err);
    //     }
    //     else {
    //         const newAlbum = new Album(req.body)
    //         try{
    //             const savedAlbum = (async () => await newAlbum.save());
    //             res.status(200).json(savedAlbum)
    //         } catch(err) {
    //             res.status(500).json(err);
    //         }
    //     }
    // })
    let alreadyExists = await Album.exists({spotifyId:req.body.spotifyId}); 
    if (alreadyExists) console.log("exists ", req.body.title, alreadyExists);
    else {
        console.log("doesn't exist ", req.body.title);
        if (alreadyExists == null) {
            const newAlbum = new Album(req.body)
            try{
                console.log("trying2")
                const savedAlbum = await newAlbum.save();
                res.status(200).json(savedAlbum)
            } catch(err) {
                res.status(500).json(err);
            }
        } 
    }
})

//update album (fix)
// router.put("/fix/:id", async (req, res) => {
//     try {
//         const album = await Album.findById(req.params.id);
//         await album.updateOne({ $set: req.body });
//         res.status(200).json("the post has been updated");
//     } catch (err) {
//         res.status(500).json(err);
//     }
//   });
// update album (priority)
router.put("/skip/:id", async (req, res) => {
        try {
            const album = await Album.findById(req.params.id);
            await album.updateOne({ $set:{priority:1} });
            res.status(200).json("priority has been reset");
        } catch (err) {
            res.status(500).json(err);
        }
      });

// update album (log)
router.put("/:id", async (req, res) => {
    console.log("trying to update")
    try {
        let album = await Album.findById(req.params.id);
        console.log(album);
        //album.marked = true;
        //album.userData = req.body.albumUserData;
        let updatedTracks = []
        let i = 0;
        while (album.tracks[i]) { // run through all songs on album
            if (req.body.tracksUserData[i]) { // if song is tagged, add logged version to array
                updatedTracks.push({
                    userId:album.tracks[i].userId,
                    spotifyId:album.tracks[i].spotifyId,
                    title:album.tracks[i].title,
                    artistNames:album.tracks[i].artistNames,
                    artistSpotifyIds:album.tracks[i].artistSpotifyIds,
                    albumSpotifyId:album.tracks[i].albumSpotifyId,
                    marked:true,
                    userData:req.body.tracksUserData[i],
                })
                //album.tracks[i].marked = true;
                //album.tracks[i].userData = req.body.tracksUserData[i]
            }
            else { // else, add regular version to array
                updatedTracks.push(album.tracks[i])
            }
            i++;
        }
        //console.log(album)
        
        await album.updateOne({$set:{
            marked:true,
            userData:req.body.albumUserData,
            tracks:updatedTracks
        }});

        res.status(200).json("the album has been updated")
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
        console.log(err);
        res.status(500).json(err);
    }
})

// get all user's albums
router.get("/userdb/:userId", async (req, res) => {
    // let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId)
        const userAlbums = await Album.find({ userId:currentUser._id});
        res.status(200).json(userAlbums);
    } catch(err) {
        res.status(500).json(err);
    }
})

// router.get("/userdbCount/:userId", async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.params.userId)
//         const userAlbums = await Album.find({ userId:currentUser._id});
//         const count = userAlbums.length;
//         res.status(200).send(count);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// })

// delete album
router.delete("/:id", async (req,res) => {
    try {
        const album = await Album.findById(req.params.id);
        //res.json(album);
        if (album.userId == req.body.userId) {
            await album.deleteOne();
            res.status(200).json("album deleted");
        } else {
            res.status(403).json("can only delete your own album");
        }
    } catch(err) {
            res.status(500).json(err);
    }
})

module.exports = router;