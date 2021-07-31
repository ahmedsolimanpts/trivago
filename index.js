const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport")
mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connet to DB"))
    .catch(err => console.log(err))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./router/router"))
app.use((req, res) => {
    res.json({ message: "There Is Erorr No URL" })
})
app.listen(process.env.PORT, (err, doc) => {
    if (err) console.log(err)
    console.log("server Run")
})
