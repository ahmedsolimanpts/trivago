const DB = require("../Collection/DB.js");
const moment = require("moment")
const checkinonehotel = async (req, res) => {

    let { from, to, hotelid } = req.query;

    if (!from) {
        res.json({ message: "Please Enter Check IN From" })
    } else if (!to) {
        res.json({ message: "Please Enter Check OUT To" })
    } else if (!hotelid) {
        res.json({ message: "Please Enter Hotel ID" })
    }
    else {
        try {

            from = moment(from, "MM-DD-YYYY");
            to = moment(to, "MM-DD-YYYY")


            const hid = await DB.hotel.findOne({ _id: hotelid }, { _id: 1, __v: 0 }).exec();
            if (!hid) {
                res.json({ message: "Please Enter Valid Hotl ID" })
            } else {
                if (moment(from).isSame(to)) {
                    res.json({ message: "Please Eneter Two Differnt  Dates" })
                } else {
                    from = new Date(from).toString();
                    to = new Date(to).toString();
                    await DB.Request.find({
                        $and: [
                            {
                                $or:
                                    [
                                        { from: { $gte: from, $lte: to } },
                                        { to: { $gte: from, $lte: to } }
                                    ]
                            },
                            { status: 'booking' },
                            { hotel: hid }
                        ]
                    }).populate({ path: 'hotel', }).populate('room').then(doc => {
                        if (doc.length > 0) {
                            res.json(doc);

                        } else {
                            res.json({ message: "NO Requests Booking" });
                        }
                    }).catch(e => console.log(e));
                }

            }

        } catch (e) {
            console.log(e)
        }
    }


}

module.exports = {
    checkinonehotel: checkinonehotel
}