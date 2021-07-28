const DB = require("../Collection/DB");
const AddOffer = async (req, res) => {

    let { from, to, hotel, salary, decription } = req.body;
    let hotelid = await DB.hotel.findOne({ name: hotel }, { _id: 1 }).exec()
    if (!from || !to || !hotel || !salary || !decription) {
        res.json({ message: "Please Enter All Fields" })
    } else if (hotelid) {
        try {

            const newoffer = new DB.offer({ from, to, hotel: hotelid, salary, decription });
            await newoffer.save().then((doc) => {
                res.json({ doc, message: "create sucess" });
            }).catch(err => {
                // console.log(err._message)
                res.status(404).json(err.errors)

            })
        }
        catch (err) { console.log(err) }
    } else {
        res.json({ message: "No Hotel With This Name Please Try Again" })
    }
}
const DeleteOffer = async (req, res) => {
    const { id } = req.body;
    try {
        await DB.offer.findByIdAndDelete({ _id: id }).then(doc => {
            res.json({ message: "Delete Sucess", doc })
        }).catch(err => { console.log(err) })
    } catch (err) {
        console.log(err)
    }
}
const GetAllOffer = async (req, res) => {
    try {
        await DB.offer.find().then((doc) => {
            if (doc.length > 0) {
                res.json(doc)
            } else {
                res.json({ message: "No Offer Yet" })
            }
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}
const GetOfferForOneHotel = async (req, res) => {
    const { hotel } = req.body;
    try {
        await DB.offer.find({ hotel: hotel }).then(doc => {
            if (doc.length > 0) {
                res.json({ message: "sucess", doc })
            } else {
                res.json({ message: "This Hotel Has No Offer Yet" })
            }
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    AddOffer: AddOffer,
    DeleteOffer: DeleteOffer,
    GetAllOffer: GetAllOffer,
    GetOfferForOneHotel: GetOfferForOneHotel
}