const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//make post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch(err) {
        res.status(500).json(err);
    }
});

//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userEmail === req.body.userEmail) {
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
        } else {
            res.status(403).json("you can only update your posts")
        }
    } catch(err) {
        res.status(500).json(err)
    }
    
})

//get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
})

//get all posts
router.get("/userdb/all", async (req, res) => {
    // let postArray = [];
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({ userId:currentUser._id})
        // console.log(currentUser.email);
        res.json(userPosts)
        // res.send(req.body._id)
        // res.send(currentUser.value)
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;