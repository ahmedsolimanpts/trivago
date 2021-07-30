const DB = require("../Collection/DB.js");
const moment = require("moment")
const checkinonehotel = async (req, res) => {

    const { from, to, hotelid } = req.query;

    if (!from) {
        res.json({ message: "Please Enter Check IN From" })
    } else if (!to) {
        res.json({ message: "Please Enter Check OUT To" })
    } else if (!hotelid) {
        res.json({ message: "Please Enter Hotel ID" })
    }
    else {
        try {
            const hid = await DB.hotel.findOne({ _id: hotelid }).exec();
            var current = moment(from);
            var stop = moment(to);
            console.log(moment.tz(from, 'Africa/Cairo'))
            console.log(moment.tz(to, 'Africa/Cairo'))

            let dr = []
            while (current <= stop) {
                dr.push(current);
                current = moment(current).add(1, 'days')
            }
            if (hid) {
                await DB.booking.find().populate({ path: "Request", match: { hotel: hid } }).exec((e, docs) => {
                    if (e) throw console.log(e)
                    if (docs.length > 0) {
                        res.json({ dr, docs })
                    } else {
                        res.json({ message: "no Booking" })
                    }
                })
            } else {
                res.json({ message: "Please Enter Valid Hotel ID" })
            }
        } catch (e) {
            console.log(e)
        }
    }


}

module.exports = {
    checkinonehotel: checkinonehotel
}