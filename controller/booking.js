const DB = require("../Collection/DB");
const moment = require("moment")
const momenttime = require("moment-timezone")
// function to Get All Reqord Booking
const GetallBooking = async (req, res) => {
    try {
        await DB.booking.find().populate('Request').exec((e, docs) => {
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
    const { hotel } = req.query;
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
    const { request, roomid } = req.query;
    if (!request) {
        res.json({ message: "Enter Request ID" })
    }
    else if (!roomid) {
        res.json({ message: "Enter Room ID" })
    } else {
        const Rid = await DB.Request.findById({ _id: request }).exec();
        const Roomid = await DB.room.findOne({ roomid: roomid }, { _id: 1 }).exec()

        if (!Rid) {
            res.json({ message: " Please Enter Coreect Request ID" });
        }
        else if (!Roomid) {
            res.json({ message: " Please Enter Coreect Room ID" });
        }
        else {
            let from = Rid.from;
            let to = Rid.to;
            let userid = Rid.user._id;
            let Requestid = Rid._id;
            let stop = moment.tz(to, 'Africa/Cairo')
            let Datearray = [];
            let current = moment.tz(from, 'Africa/Cairo');
            let st = moment.tz(to, 'Africa/Cairo')
            let Dr = [];
            let cr = moment.tz(from, 'Africa/Cairo');
            // start chech for ROOM ID AND DATE IS NOT BOOKING BEFORE
            while (cr <= st) {
                let date = moment(cr, 'Africa/Cairo');
                await DB.booking.findOne({ Date: date }).populate({ path: 'Request', match: { room: Roomid } })
                    .then(doc => {
                        if (doc) { Dr.push(moment.tz(date, 'Africa/Cairo')); }
                    })
                cr = moment.tz(cr, 'Africa/Cairo').add(1, 'days')
            }
            // END CHECK
            if (Dr.length > 0) { //IF ROOM IS BOOKING RETUEN THE DATE THAT IS BOOKING
                res.json({ message: "this room is Booking in This Days" })
            } else {
                // ROOM IS NOT BOOKING
                while (current <= stop) {
                    Datearray.push(moment.tz(current, 'Africa/Cairo'));
                    let date = moment.tz(current, 'Africa/Cairo');
                    let newbooking = new DB.booking({ user: userid, Date: date, requestid: Requestid });
                    newbooking.save().catch(e => console.log(e))
                    current = moment.tz(current, 'Africa/Cairo').add(1, 'days')
                }
                await DB.Request.findOneAndUpdate({ _id: Requestid }, { room: Roomid, status: 'booking' }).populate('room').then(doc => {
                    if (doc) {
                        res.json({ doc, message: "DONE" })
                    } else {
                        res.json({ message: "Can't" })
                    }
                }).catch(e => console.log(e))
            }
        }
    }



}
module.exports = {
    GetallBooking: GetallBooking,
    GethotelBooking: GethotelBooking,
    Addbooking: Addbooking
}