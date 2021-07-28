const DB = require("../Collection/DB.js");
const addemployee = async (req, res) => {
    const { name, phone, salary, hotel, Department } = req.body;
    if (!name || !phone || !salary || !hotel || !Department) {
        res.json({ message: "Please Enter All Fields" })
    }
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
}

module.exports = {
    addemployee: addemployee,
    getemployeesinhotel: getemployeesinhotel
}