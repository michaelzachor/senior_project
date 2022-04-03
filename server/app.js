const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userInfoRoute = require("./routes/userInfo");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const albumRoute = require("./routes/albums")
const cors = require("cors");

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB")
})

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
}
app.get('/', (req, res) => {
  res.status(200).send({
    message:"in base"
  })
  console.log("in base");
})

app.use('/userInfo', userInfoRoute);
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/albums', albumRoute);

app.listen(port, () => console.log("Server is running on port ", port)); //runs automatically