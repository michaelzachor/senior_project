const express = require("express");

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send("Hello World"); //runs if we make a get request
});

app.listen(port, () => console.log("Server is running.")); //runs automatically