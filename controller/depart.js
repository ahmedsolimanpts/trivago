const DB = require("../Collection/DB")
const addDepartment = async (req, res) => {
    const { name, hotel } = req.body;
    const hotelid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec();
    try {
        if (!name || !hotel) {
            res.json({ message: "Please Enter Depart Name And Hotel Name" })
        } else if (hotelid) {
            const newdepart = new DB.Department({ name, hotel_id: hotelid });
            newdepart.save().then(doc => {
                if (doc) {
                    res.json({ message: "Sucess Add", doc })
                } else {
                    res.json({ message: "Can't Add" })
                }
            }).catch(e => console.log(e))
        } else {
            res.json({ message: "Please Enter Correct Hotel name" })
        }
    } catch (e) {

    }
};
const getdepartinhotel = async (req, res) => {
    const { hotel } = req.body;
    if (!hotel) {
        res.json({ message: "Please Enter Hotel Name" });
    }
    try {
        const hid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec();
        if (!hid) {
            res.json({ message: "No Hotel With This Name " })
        } else {

            await DB.Department.find({ hotel_id: hid }).populate('hotel_id').exec((err, doc) => {
                if (err) throw console.log(err)
                if (doc.length > 0) {
                    res.status(200).json({ message: "Sucess", doc })
                } else {
                    res.json({ message: "No Deaprtment Yet In this Hotel " })
                }
            })
        }


    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addDepartment: addDepartment,
    getdepartinhotel: getdepartinhotel
}