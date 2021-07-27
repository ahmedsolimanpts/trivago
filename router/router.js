const router = require("express").Router();
const userController = require("../usercontroll/controller");
const HotelController = require("../hotelcontroller/controller")
const offercontroller = require("../hotelcontroller/offer")
router.get("/getalluser", userController.GetAlluser);
router.get("/getallhotels", HotelController.GetAllHotels);
router.get("/getalloffers", offercontroller.GetAllOffer);
router.get("/gethoteloffer", offercontroller.GetOfferForOneHotel);
router.post("/getonehotelname", HotelController.GetHotelwithname);
router.post("/getonehotelid", HotelController.gethotelwithid);
router.post("/adduser", userController.AddUser);
router.post("/addhotel", HotelController.AddHotel);
router.post("/addoffer", offercontroller.AddOffer);
router.post("/deleteoffer", offercontroller.DeleteOffer);
router.post("/deletehotel", HotelController.deletehotel);
module.exports = router;