const DB = require("../Collection/DB");
const moment = require("moment")
const os = require("os")
const addRequestget = async (req, res) => {
    let { user, hotel, from, to, totalsalary, room, inoffer, offerid } = req.query;
    let errors = [];
    if (!user) {
        errors.push("Please Enter User Email")
    }
    else if (!hotel) {
        errors.push("Please Enter Hotel name")
    }
    else if (!from) {
        errors.push("Please Enter check IN Date")
    }
    if (!to) {
        errors.push("Please Enter check OUT Date")
    }
    from = moment.tz(from, 'africa/cairo');
    to = moment.tz(to, 'africa/cairo');

    const uid = await DB.user.findOne({ email: user }).exec();
    const hid = await DB.hotel.findOne({ name: hotel }).exec();
    const oid = await DB.offer.findOne({ _id: offerid }).exec();
    if (!uid) {
        errors.push("User Email Is Wrong No User With This Email")
    }
    else if (!hid) {
        errors.push("Hotel Name Is Wrong Try Again")
    }
    if (errors.length > 0) {
        res.json({ message: errors });
    } else {
        try {
            if (oid && hid && uid) {
                const newrequest = new DB.Request({ user: uid, hotel: hid, from, to, offer: oid, inoffer: true });
                newrequest.save().then(doc => {
                    if (doc) {
                        res.json({ message: "Request Create", doc })
                    } else {
                        res.json({ message: "Can't Create" })
                    }
                }).catch(e => console.log(e))
            } else {
                const nrequest = new DB.Request({ user: uid, hotel: hid, from, to });
                nrequest.save().then(doc => {
                    if (doc) {
                        console.log(doc)
                        res.json({ message: "Request Create", doc })
                    } else {
                        res.json({ message: "Can't Create" })
                    }
                }).catch(e => console.log(e))
            }
        } catch (e) {
            console.log(e)
        }
    }
}
const addRequest = async (req, res) => {
    let { user, hotel, from, to, totalsalary, room, inoffer, offerid } = req.body;
    let errors = [];
    if (!user) {
        errors.push("Please Enter User Email")
    }
    else if (!hotel) {
        errors.push("Please Enter Hotel name")
    }
    else if (!from) {
        errors.push("Please Enter check IN Date")
    }
    if (!to) {
        errors.push("Please Enter check OUT Date")
    }
    from = moment.tz(from, 'africa/cairo');
    to = moment.tz(to, 'africa/cairo');

    const uid = await DB.user.findOne({ email: user }).exec();
    const hid = await DB.hotel.findOne({ name: hotel }).exec();
    const oid = await DB.offer.findOne({ _id: offerid }).exec();
    if (!uid) {
        errors.push("User Email Is Wrong No User With This Email")
    }
    else if (!hid) {
        errors.push("Hotel Name Is Wrong Try Again")
    }
    if (errors.length > 0) {
        res.json({ message: errors });
    } else {
        try {
            if (oid && hid && uid) {
                const newrequest = new DB.Request({ user: uid, hotel: hid, from, to, offer: oid, inoffer: true });
                newrequest.save().then(doc => {
                    if (doc) {
                        res.json({ message: "Request Create", doc })
                    } else {
                        res.json({ message: "Can't Create" })
                    }
                }).catch(e => console.log(e))
            } else {
                const nrequest = new DB.Request({ user: uid, hotel: hid, from, to });
                nrequest.save().then(doc => {
                    if (doc) {
                        console.log(doc)
                        res.json({ message: "Request Create", doc })
                    } else {
                        res.json({ message: "Can't Create" })
                    }
                }).catch(e => console.log(e))
            }
        } catch (e) {
            console.log(e)
        }
    }
}
const getRequests = async (req, res) => {
    try {
        await DB.Request.find().populate('user').then(doc => {
            if (doc) {

                res.json(doc)
            } else {
                res.json({ message: "Not Yet" })
            }
        })
    } catch (e) {
        console.log(e)
    }
}
const gethotelrequest = async (req, res) => {
    const { hotel } = req.query;
    if (!hotel) {
        res.json({ message: " Please Enter Hotel Name" });
    } else {
        const hid = await DB.hotel.findOne({ name: hotel }).exec();
        try {
            if (!hid) {
                res.json({ message: "Please Enter Valid Hotel Name" })
            } else {
                DB.Request.find().populate({ path: 'hotel', match: { hotel: hid } }).exec((err, docs) => {

                    if (err) throw console.log(err)
                    if (docs) {
                        res.json({ message: "sucess", docs })
                    } else {
                        res.json({ message: "No Requests Yet" })
                    }
                });
            }
        } catch (e) {
            console.log(e)
        }
    }

}
const deleterequestID = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            res.json({ message: "Please Enter ID For Request" })
        } else {
            await DB.Request.findByIdAndDelete({ _id: id }).then(doc => {
                if (doc) {
                    res.json({ message: "sucess delete ", doc })

                } else {
                    res.json({ message: "cant delete enter valid id" })
                }
            }).catch(e => console.log(e))
        }

    } catch (e) {
        console.log(e)
    }
}
const DeleteHotelRequests = async (req, res) => {
    const { hotel } = req.body;
    try {
        if (!hotel) {
            res.json({ message: "Please Enter Hotle Name" })
        } else {
            await DB.Request.deleteMany().populate({ path: 'hotel', match: { name: hotel } }).exec((e, doc) => {
                if (e) throw console.log(e)
                if (doc.length > 0) {
                    res.json({ message: "sucess delete ", doc })

                } else {
                    res.json({ message: "cant delete enter valid Hotel Name" })
                }
            })
        }

    } catch (e) {
        console.log(e)
    }
}
const getonerequest = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.json({ message: "Enter Request id" })
    } else {
        try {
            await DB.Request.find({ _id: id }).exec((e, doc) => {
                if (e) throw console.log(e)
                if (doc.length > 0) {
                    res.json(doc)
                } else {
                    res.json({ message: "Please Enter Valid Request ID" })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

}
module.exports = {
    addRequest: addRequest,
    addRequestget: addRequestget,
    getRequests: getRequests,
    gethotelrequest: gethotelrequest,
    deleterequestID: deleterequestID,
    DeleteHotelRequests: DeleteHotelRequests,
    getonerequest: getonerequest
}