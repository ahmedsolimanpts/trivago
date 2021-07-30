const DB = require("../Collection/DB");
// function To Login
const loginattend = async (req, res) => {
    const { user, hotel } = req.body;
    const acction = 'Log IN';
    if (!user) {
        res.json({ message: "Please Enter User" })
    }
    if (!hotel) {
        res.json({ message: "Please Enter Hotel" })
    }
    const uid = await DB.user.findOne({ email: user }).exec();
    const hid = await DB.hotel.findOne({ name: hotel }).exec();
    try {
        if (!uid) {
            res.json({ message: "Please Enter Valid User Email" })
        }
        if (!hid) {
            res.json({ message: "Please Enter Valid Hotel Name" })
        }
        if (uid && hid) {
            const newlog = new DB.Attendence({ usr: uid, hotel: hid, acction });
            newlog.save().then(doc => {
                if (doc) {
                    res.json({ message: "Sucess Log", doc })
                } else {
                    res.json({ message: "Can't Log" })

                }
            }).catch(e => console.log(e))
        } else {
            res.json({ message: "Please Enter Valid Hotel Name and User Email" })

        }

    } catch (e) {
        console.log(e)
    }
}
//function to Leave
const leaveattend = async (req, res) => {
    const { user, hotel } = req.body;
    const acction = 'Leave';
    if (!user) {
        res.json({ message: "Please Enter User" })
    }
    if (!hotel) {
        res.json({ message: "Please Enter Hotel" })
    }
    const uid = await DB.user.findOne({ email: user }).exec();
    const hid = await DB.hotel.findOne({ name: hotel }).exec();
    try {
        if (!uid) {
            res.json({ message: "Please Enter Valid User Email" })
        }
        if (!hid) {
            res.json({ message: "Please Enter Valid Hotel Name" })
        }
        if (uid && hid) {
            const newlog = new DB.Attendence({ usr: uid, hotel: hid, acction });
            newlog.save().then(doc => {
                if (doc) {
                    res.json({ message: "Sucess Leave", doc })
                } else {
                    res.json({ message: "Can't" })

                }
            }).catch(e => console.log(e))
        } else {
            res.json({ message: "Please Enter Valid Hotel Name and User Email" })

        }

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    loginattend: loginattend,
    leaveattend: leaveattend
}