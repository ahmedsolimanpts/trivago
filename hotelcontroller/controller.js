const DB = require("../Collection/DB");
const AddHotel = async (req, res) => {
    try {
        const { name, phone, email, description, admins } = req.body;
        if (!name || !phone || !email || !description || !admins) {
            res.json({ message: "please Enter All Fields And try Again" })
        } else {
            const newHotel = new DB.hotel({ name, phone, email, description, admins });
            newHotel.save().then((docs) => {
                res.json({ msg: "Create Sucess", docs })
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}
// Function To Get All Hotels Data
const GetAllHotels = async (req, res) => {
    try {
        await DB.hotel.find().then(docs => {
            if (docs.length > 0) {
                return res.json(docs);
            }
            else {
                return res.json({ message: "there Is No Hotel Yet" });
            }
        })
    } catch (err) {
        return console.log(err)
    }
};


module.exports = {
    GetAllHotels: GetAllHotels,
    AddHotel: AddHotel
}