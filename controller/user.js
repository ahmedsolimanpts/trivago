const DB = require("../Collection/DB")
const validator = require("validator");

const GetAlluser = async (req, res) => {
    try {
        DB.user.find().then(doc => {
            if (doc.length > 0) {
                res.json(doc)
            } else {
                res.json({ message: "There Is No User Yet" })
            }
        })

    } catch (err) {
        console.log(err)
    }
};
const AddUser = async (req, res) => {
    try {
        const { name, phone, email, password, password2 } = req.body;
        if (!name || !phone || !email || !password || !password2) {
            res.json({ message: "please Enter All Fields" })
        } else if ([password != password2] && password.length < 8) {
            res.json({ message: "Please Enter Match Password And More Than 8" })
        } else if (!validator.isEmail(email)) {
            res.json({ message: "Please Enter A Valid Email" })
        }
        else {
            const newUser = new DB.user({ name, phone, email, password, });
            newUser.save().then(doc => {
                res.json({ doc, message: "ADD User Success" })
            }).catch(err => {
                if (err.code == 11000) {
                    //res.json({}) //generic error handling goes here
                    console.log(err)
                    const errr = err.keyPattern;
                    res.json({ message: `Duplicate Value Is Enter`, errr })
                }
            })

        }

    } catch (err) {

        console.log(err); //generic error handling goes here

    }
}
const updateuser = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    GetAlluser: GetAlluser,
    AddUser: AddUser,
    updateuser: updateuser
}