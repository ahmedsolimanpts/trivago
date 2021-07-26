const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connet to DB"))
    .catch(err => console.log(err))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use((req, res, next) => {
//     console.log("NEW Request");
//     console.log("********");
//     next()
// })
app.use("/api", require("./router/router"))
app.use((req, res) => {
    res.json({ message: "There Is Erorr No URL" })
})
app.listen(process.env.PORT, (err, doc) => {
    if (err) console.log(err)
    console.log("server Run")
})
