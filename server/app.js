const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userInfoRoute = require("./routes/userInfo");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const albumRoute = require("./routes/albums")
const cors = require("cors");

const app = express();
const port = 4000;
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB")
})

app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use('/userInfo', userInfoRoute);
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/albums', albumRoute);

app.listen(port, () => console.log("Server is running.")); //runs automatically