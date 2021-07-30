const DB = require("../Collection/DB");
// Function Get All Hotel Invoice
const gethotelinvoice = async (req, res) => {
    const HotelName = req.body.hotel;
    if (!HotelName) {
        res.json({ message: "Please Enter Hotel Name" })
    }
    const hid = await DB.hotel.findOne({ name: HotelName }).exec();
    try {
        if (hid) {
            await DB.uinvoice.find().populate('Request', { hotel: hid }).exec((err, doc) => {
                if (err) throw console.log(err)
                if (doc) {
                    res.status(200).json({ message: "sucess", doc })
                } else {
                    res.json({ message: "NO invoice Yet" })
                }
            })
        } else {
            res.json({ message: "please Enter Valid Hotel Name" })
        }
    } catch (e) {
        console.log(e);
    }
}
// Function To get User Invoice In One Hotel
const getuinvoiceinhotel = async (req, res) => {
    const { HotelName, email } = req.body;
    if (!HotelName) {
        res.json({ message: "Please Enter Hotel Name " })
    }
    if (!user) {
        res.json({ message: "Please Enter User email  " })
    }
    const hid = await DB.hotel.findOne({ name: HotelName }).exec();
    const uid = await DB.user.findOne({ email: email }).exec();
    try {
        if (hid && uid) {
            await DB.uinvoice.find({ user: uid }).populate('Request', { hotel: hid }).exec((err, doc) => {
                if (err) throw console.log(err)
                if (doc) {
                    res.status(200).json({ message: "sucess", doc })
                } else {
                    res.json({ message: "NO invoice Yet" })
                }
            })
        } else {
            res.json({ message: "please Enter Valid Hotel Name and user email" })
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    gethotelinvoice: gethotelinvoice,
    getuinvoiceinhotel: getuinvoiceinhotel
}