const DB = require("../Collection/DB");
const moment = require("moment")
// function to Get All Reqord Booking
const GetallBooking = async (req, res) => {
    try {
        await DB.booking.find().populate('hotel').populate('Request').exec((e, docs) => {
            if (e) throw console.log(e)
            if (docs.length > 0) {
                res.status(200).json({ message: "sucess", docs })
            } else {
                res.json({ message: "NO Booking Yet" })
            }
        })
    } catch (e) {
        console.log(e)
    }
};
// function to Get All Reqord Booking IN Hotel
const GethotelBooking = async (req, res) => {
    const { hotel } = req.body;
    try {
        if (!hotel) {
            res.json({ message: "Please Enter Hotel Name" })
        } else {
            const hid = await DB.hotel.findOne({ name: hotel }).exec();
            if (hid) {
                await DB.booking.find().populate({ path: 'hotel', match: { name: hotel } }).populate('Request').exec((e, docs) => {
                    if (e) throw console.log(e)
                    if (docs.length > 0) {
                        res.status(200).json({ message: "sucess", docs })
                    } else {
                        res.json({ message: "NO Booking Yet " })
                    }
                })
            } else {
                res.json({ message: "Please Enter Valid Hotel Name" })
            }

        }

    } catch (e) {
        console.log(e)
    }
};
const Addbooking = async (req, res) => {
    const { user, request } = req.query;
    if (!user) {
        res.json({ message: "Enter User ID" })
    }
    else if (!request) {
        res.json({ message: "Enter Request ID" })
    }
    const uid = await DB.user.findById({ _id: user }).exec();
    const Rid = await DB.Request.findById({ _id: request }).exec();
    if (!uid) {
        res.json({ message: " Please Enter Coreect User ID" });
    }
    else if (!Rid) {
        res.json({ message: " Please Enter Coreect Request ID" });
    } else {
        let from = Rid.from;
        let to = Rid.to;
        let stop = moment(to)
        let Datearray = [];
        let current = moment(from);
        while (current <= stop) {
            Datearray.push(moment(current));
            current = moment(current).add(1, 'days')
        }
        res.json({ from: from, Datearray, to: to })
        // res.json({ uid, Rid, from: from, to: to })

    }

}
module.exports = {
    GetallBooking: GetallBooking,
    GethotelBooking: GethotelBooking,
    Addbooking: Addbooking
}