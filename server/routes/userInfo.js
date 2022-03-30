const User = require("../models/User");

const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Hello it's user routes"); //runs if we make a get request
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, createdAt, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;