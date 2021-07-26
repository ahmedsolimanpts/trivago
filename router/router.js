const router = require("express").Router();
const userController = require("../usercontroll/controller");
const HotelController = require("../hotelcontroller/controller")

router.get("/getalluser", userController.GetAlluser);
router.post("/adduser", userController.AddUser);
router.get("/getallhotels", HotelController.GetAllHotels);
router.post("/addHotel", HotelController.AddHotel);
module.exports = router;