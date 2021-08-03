const DB = require("../Collection/DB");
const moment = require("moment")
const momenttime = require("moment-timezone");
const { booking } = require("../Collection/DB");
// function to Get All Reqord Booking
const GetallBooking = async (req, res) => {
    try {
        await DB.booking.find().populate('Request').populate('user').exec((e, docs) => {
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
        const Rid = await DB.Request.findById({ _id: request }).populate('user').exec();
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
            from = moment(from, "MM-DD-YYYY");
            to = moment(to, "MM-DD-YYYY");
            let userid = Rid.user._id;
            let Requestid = Rid._id;
            let stop = to
            let Datearray = [];
            let current = from;
            let st = to
            let Dr = [];
            let cr = from;
            // start chech for ROOM ID AND DATE IS NOT BOOKING BEFORE
            while (cr <= st) {
                let date = moment(cr, "MM-DD-YYYY");
                await DB.booking.findOne({ $and: [{ roomid: Roomid }, { Date: date }] }).populate({ path: 'Request', match: { room: Roomid } })
                    .then(doc => {
                        if (doc) { Dr.push(moment(date, "MM-DD-YYYY")); }
                    });
                cr = moment(cr, "MM-DD-YYYY").add(1, 'days')
            }
            // END CHECK
            if (Dr.length > 0) { //IF ROOM IS BOOKING RETUEN THE DATE THAT IS BOOKING

                res.json({ message: "this room is Booking in This Days", Dr });

            } else {
                // ROOM IS NOT BOOKING
                while (current <= stop) {
                    Datearray.push(moment(current, "MM-DD-YYYY"));
                    let date = moment(current, "MM-DD-YYYY");
                    let newbooking = new DB.booking({ user: userid, Date: date, requestid: Requestid });
                    newbooking.save().catch(e => console.log(e))
                    current = moment(current, "MM-DD-YYYY").add(1, 'days')
                }
                Datearray.length = 0;
                await DB.Request.findOneAndUpdate({ _id: Requestid }, { room: Roomid, status: 'booking' }).then(doc => {
                    if (doc) {
                        res.json({ message: "DONE" })
                    } else {
                        res.json({ message: "Can't" })
                    }
                }).catch(e => console.log(e))
            }
        }
    }



}
const GetAllbookingbyrequestid = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ message: "please Enter Valid Request ID" })
    } else {
        try {
            await DB.booking.find({ requestid: id }).populate("Request").populate('user').then(docs => {
                if (docs.length > 0) {
                    for (i in docs) {
                        console.log(moment(docs[i].Date))
                    }

                    res.json({ docs })
                } else {
                    res.json({ message: "Please Enter Valid Request ID " })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = {
    GetallBooking: GetallBooking,
    GethotelBooking: GethotelBooking,
    Addbooking: Addbooking,
    GetAllbookingbyrequestid: GetAllbookingbyrequestid
}