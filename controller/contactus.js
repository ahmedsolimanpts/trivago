const DB = require("../Collection/DB");
const addcontactmessage = async (req, res) => {
    const { message, user, hotel } = req.body;


    try {
        if (!message || !user || !hotel) {
            res.json({ message: "please Enter All requirements" })
        }
        const userid = await DB.user.findOne({ email: user }, { _id: 1 }).exec();

        const hid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec();

        if (!userid) {
            res.status(200).json({ message: "pleasse Enter Valid Email" })
        }
        else if (!hid) {
            res.status(200).json({ message: "pleasse Enter Valid Hotel Name" })
        }
        else {
            const newcontact = new DB.contactus({ message, user: userid, hotel: hid })
            await newcontact.save().then(doc => {
                if (doc) {
                    res.status(200).json({ message: "Sucess Create", doc })
                } else {
                    res.status(200).json({ message: "Can't Create" })

                }
            }).catch(e => console.log(e))
        }
    } catch (e) {
        console.log(e)
    }
}
const getconactforhotel = async (req, res) => {
    const hotel = req.body.hotel;
    const hotelid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec();

    try {
        if (!hotelid) {
            res.json({ message: "Please Try Again No Hotel With This Name" })
        } else {
            await DB.contactus.find({ hotel: hotelid }).populate("hotel").populate('user').exec((err, doc) => {
                if (err) throw console.log(err)
                if (doc.length > 0) {
                    res.json({ message: "Sucees Get", doc });
                } else {
                    res.json({ message: "No Contact Yet" });
                }
            })
        }

    } catch (e) {
        console.log(e)
    }
}
const Deletecontactwemail = async (req, res) => {
    const { user } = req.body;
    if (!user) {
        res.json({ message: "No User Entered" })
    }
    const uid = await DB.user.findOne({ email: user }, { _id: 1 }).exec();
    try {
        if (uid) {
            await DB.contactus.findOneAndDelete({ user: uid }).populate('user').then(doc => {
                if (doc) {
                    res.json({ message: "Done Dlete", doc })
                } else {
                    res.json({ message: "Can't Delete No Doc With This Email" })
                }
            }).catch(e => console.log(e))
        } else {
            res.json({ message: "Please Enter Valid Email Wrong Email" })
        }

    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    addcontactmessage: addcontactmessage,
    getconactforhotel: getconactforhotel,
    Deletecontactwemail: Deletecontactwemail
}