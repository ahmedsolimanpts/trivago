const DB = require("../Collection/DB");
const Addroom = async (req, res) => {
    const { roomid, floor, hotelname, description, salary } = req.body;
    const hotelid = await DB.hotel.findOne({ name: hotelname }, { _id: 1 }).exec();
    try {
        if (!roomid || !floor || !hotelname || !description || !salary) {
            res.json({ message: "please Enter all requirments" })
        } else if (!hotelid) {
            res.json({ message: "PLease Enter Valid Hotel Name" })
        }
        else {
            const isroomhere = await DB.room.findOne({ $and: [{ roomid: roomid }, { floor: floor }] }).exec();
            if (!isroomhere) {
                const newroom = new DB.room({ roomid, floor, hotelid, description, salary });
                await newroom.save().then((doc) => {
                    if (doc) {
                        res.json(doc)
                    }
                }).catch(e => { console.log(e) })
            } else {
                res.json({ message: "please enter another room id or floor there is room in this floor register" })
            }
        }

    } catch (e) {
        console.log(e)
    }
};
const Getallroom = async (req, res) => {
    try {
        await DB.room.find().then(doc => {
            if (doc) {
                res.json(doc)
            } else {
                res.json({ message: "No Room Yet Is Entry" })
            }
        }).catch(e => {
            console.log(e)
        });
    } catch (e) {
        console.log(e)
    }
};
const Deleteroom = async (req, res) => {
    const { roomid, hotelname, roomfloor } = req.body;
    console.log(req.body)
    if (!roomid || !hotelname || !roomfloor) {
        res.json({ message: "Please Enter All Fildes" })
    }
    const hotelid = await DB.hotel.findOne({ name: hotelname }, { _id: 1 }).exec();
    const rooms = await DB.room.findOne({ $and: [{ roomid: roomid }, { floor: roomfloor }] }).populate('hotel', { hotel: hotelname }).exec()
    console.log(hotelid)
    console.log(rooms)
    try {
        if (hotelid) {

            /*  await DB.room.findOneAndDelete().then(doc => {
                 if (doc) {
                     res.json({ message: "Delete Done", doc })
                 } else {
                     res.json({ message: "Delete Not Compelete" })
                 }
             }).catch(e => {
                 console.log(e)
             }) */
        }
        else {
            res.json({ message: "Please Enter Valid Hotel Name or room" })
        }
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = {
    Addroom: Addroom,
    Getallroom: Getallroom,
    Deleteroom: Deleteroom
}