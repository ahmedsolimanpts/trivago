const DB = require("../Collection/DB");
const validator = require("validator");
//------------- Function To Add Hotel Data ------------------//
const AddHotel = async (req, res) => {
    const { name, phone, email, description, admins } = req.query;
    if (!name || !phone || !email || !description || !admins) {
        res.json({ message: "please Enter All Fields And try Again" })
    }
    else {
        try {
            if (validator.isEmail(email)) {
                const adminid = await DB.user.findOne({ email: admins }).exec()
                if (adminid) {
                    const newHotel = new DB.hotel({ name, phone, email, description, admins: adminid });
                    newHotel.save().then((docs) => {
                        res.json({ msg: "Create Sucess", docs })
                    }).catch(err => {
                        if (err.code == 11000) {
                            console.log(err)
                            res.json({ err, message: "Duplicate Erorr Please Try Another Value" })
                        } else {
                            console.log(err)
                        }
                    })
                } else {
                    res.json({ message: "please Enter Valid Admin User There Is No User With This Email" })
                }
            } else {
                res.json({ message: "please Enter Valid Email" })
            }
        }
        catch (err) {
            console.log(err)
        }
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
const GetHotelwithname = async (req, res) => {
    const { name } = req.query;
    try {
        await DB.hotel.find({ name: name })
            .then(doc => {
                if (doc.length > 0) {
                    res.json(doc)
                } else {
                    res.json({ message: "No Hotel Yet" })
                }
            }).catch(e => console.log(e))
    } catch (e) {
        console.log(e)
    }
}
const gethotelwithid = async (req, res) => {
    const { id } = req.query;
    try {
        await DB.hotel.find({ _id: id })
            .then(doc => {
                if (doc.length > 0) {
                    res.json(doc)
                } else {
                    res.json({ message: "No Hotel Yet" })
                }
            }).catch(e => console.log(e))
    } catch (e) {
        console.log(e)
    }
}
const deletehotel = async (req, res) => {
    const { id } = req.body;
    try {
        await DB.hotel.findByIdAndDelete({ _id: id }).then(doc => {
            if (doc) {
                res.json({ message: "Delete Sucess" })
            } else {
                res.json({ message: "Try Again No Hotel With This Name" })
            }
        }).catch(e => console.log(e))
    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    GetAllHotels: GetAllHotels,
    AddHotel: AddHotel,
    GetHotelwithname: GetHotelwithname,
    gethotelwithid: gethotelwithid,
    deletehotel: deletehotel
}