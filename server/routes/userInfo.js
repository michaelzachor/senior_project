const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("Hello it's user routes"); //runs if we make a get request
});

module.exports = router;