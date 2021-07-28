const router = require("express").Router();
const userController = require("../controller/user");
const HotelController = require("../controller/hotel")
const offercontroller = require("../controller/offer")
const roomcontroller = require("../controller/room");
const departmentcontroller = require("../controller/depart")
const empcontroller = require("../controller/employee")
// ----------------- User Router --------------- //
router.get("/getalluser", userController.GetAlluser);
router.post("/adduser", userController.AddUser);
// ----------------- User Router --------------- //
// ----------------- Hotel Router --------------- //
router.get("/getallhotels", HotelController.GetAllHotels);
router.post("/getonehotelid", HotelController.gethotelwithid);
router.post("/getonehotelname", HotelController.GetHotelwithname);
router.post("/addhotel", HotelController.AddHotel);
router.post("/deletehotel", HotelController.deletehotel);
// ----------------- Hotel Router --------------- //
// ----------------- Offer Router --------------- //
router.get("/gethoteloffer", offercontroller.GetOfferForOneHotel);
router.get("/getalloffers", offercontroller.GetAllOffer);
router.post("/addoffer", offercontroller.AddOffer);
router.post("/deleteoffer", offercontroller.DeleteOffer);
// ----------------- Offer Router --------------- //
// ----------------- Room Router --------------- //
router.get("/getrooms", roomcontroller.Getallroom);
router.post("/addroom", roomcontroller.Addroom);
router.post("/deleteroom", roomcontroller.Deleteroom);
router.post("/getallroomhotel", roomcontroller.Getroomforonehotel);
// ----------------- Room Router --------------- //
// ----------------- Department Router --------------- //
router.post("/adddepartment", departmentcontroller.addDepartment);
router.post("/gethdepart", departmentcontroller.getdepartinhotel)
// ----------------- Department Router --------------- //
// ----------------- Employee Router --------------- //
router.post("/addemp", empcontroller.addemployee);
router.post("/hotelemp", empcontroller.getemployeesinhotel)
// ----------------- Employee Router --------------- //

module.exports = router;