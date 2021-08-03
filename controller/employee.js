const DB = require("../Collection/DB.js");
const addemployee = async (req, res) => {
    const { name, phone, salary, hotel, Department } = req.body;
    if (!name || !phone || !salary || !hotel || !Department) {
        res.json({ message: "Please Enter All Fields" })
    } else {
        try {
            const hotelid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec();
            const Departid = await DB.Department.findOne({ name: Department }, { _id: 1 }).exec();
            const isphone = await DB.Employee.findOne({ phone: phone }).exec();
            if (isphone) {
                res.json({ message: "there is Phone Regiester Before With Someone Please TRY another Number" })
            }
            else if (hotelid && Departid) {
                const newemp = new DB.Employee({ name, phone, salary, hotel: hotelid, Department: Departid });
                newemp.save().then(doc => {
                    if (doc) {
                        res.json({ message: "sucess add", doc })
                    } else {
                        res.json({ message: "Can't Add" })
                    }
                }).catch(e => console.log(e))
            } else {
                res.json({ message: "Please Enter Valid Department and Hotel Name" })
            }
        } catch (e) {
            console.log(e)
        }
    }

};

const getemployeesinhotel = async (req, res) => {
    const { hotel } = req.body;
    try {
        if (!hotel) {
            res.json({ message: "Enter Hotel Name" })
        } else {
            const hid = await DB.hotel.findOne({ name: hotel }).exec()
            if (hid) {
                await DB.Employee.find({ hotel: hid }).populate("hotel",).exec((e, doc) => {
                    if (e) throw console.log(e)
                    if (doc.length > 0) {
                        res.status(200).json({ message: "Success Get", doc })
                    } else {
                        res.status(200).json({ message: "No Employee Yet" })
                    }
                })
            }
            else {
                res.json({ message: "No hotel With This Name" })
            }

        }

    } catch (e) {
        console.log(e)
    }
};
const attendEmployee = async (req, res) => {
    const { user, hotel } = req.body;
    if (!user) {
        res.json({ message: "Please Enter User" })
    } else if (!hotel) {
        res.json({ message: "please Enter Hotel" })
    } else {
        const userid = await DB.user.findOne({ email: user }).exec();
        const hotelid = await DB.hotel.findOne({ name: hotel }).exec();
        try {
            if (!userid) {
                res.json({ message: "Please Enter Valid User Email No User With This Data" })
            } else if (!hotelid) {
                res.json({ message: "Please Enter Valid Hotel Name No Hotel With This Data" })
            } else {
                const newacction = new DB.Attendence({ user: userid, hotel: hotelid, acction: 'Attend' });
                newacction.save().then(doc => {
                    if (doc) {
                        res.status(200).json({ message: "Sucess", doc })
                    } else {
                        res.json({ message: "Can't Save" })
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
};

const leaveemployee = async (req, res) => {
    const { user, hotel } = req.body;
    if (!user) {
        res.json({ message: "Please Enter User Email" })
    } else if (!hotel) {
        res.json({ message: "please Enter Hotel Name" })
    } else {
        const userid = await DB.user.findOne({ email: user }).exec();
        const hotelid = await DB.hotel.findOne({ name: hotel }).exec();
        try {
            if (!userid) {
                res.json({ message: "Please Enter Valid User Email No User With This Data" })
            } else if (!hotelid) {
                res.json({ message: "Please Enter Valid Hotel Name No Hotel With This Data" })
            } else {
                const newacction = new DB.Attendence({ user: userid, hotel: hotelid, acction: 'leave' });
                newacction.save().then(doc => {
                    if (doc) {
                        res.status(200).json({ message: "Sucess", doc })
                    } else {
                        res.json({ message: "Can't Save" })
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
};

const GetAllTransactiontooneuser = async (req, res) => {
    const { user } = req.query;
    if (!user) {
        res.json({ message: "Please Enter User Email" })
    } else {
        try {
            const userid = await DB.user.findOne({ email: user }).exec();
            if (userid) {
                await DB.Attendence.find({ user: userid }).populate('user').populate('hotel').then(docs => {
                    if (docs) {
                        res.status(200).json({ message: "Sucess", docs })
                    } else {
                        res.json({ message: "NO log Added Yet" })
                    }
                }).catch(e => console.log(e))
            } else {
                res.json({ message: "Please Enter Valid User Email No User With This email" })
            }
        } catch (e) {
            console.log(e)
        }

    }
};

module.exports = {
    addemployee: addemployee,
    getemployeesinhotel: getemployeesinhotel,
    attendEmployee: attendEmployee,
    leaveemployee: leaveemployee,
    GetAllTransactiontooneuser: GetAllTransactiontooneuser
}