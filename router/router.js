const router = require("express").Router();
const userController = require("../controller/user");
const HotelController = require("../controller/hotel");
const offercontroller = require("../controller/offer");
const roomcontroller = require("../controller/room");
const departmentcontroller = require("../controller/depart");
const empcontroller = require("../controller/employee");
const contactcontroller = require("../controller/contactus");
const Requestcontoller = require("../controller/request");
const BookingController = require("../controller/booking")
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
router.post("/gethoteloffer", offercontroller.GetOfferForOneHotel);
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
router.post("/gethdepart", departmentcontroller.getdepartinhotel);
// ----------------- Department Router --------------- //
// ----------------- Employee Router --------------- //
router.post("/addemp", empcontroller.addemployee);
router.post("/hotelemp", empcontroller.getemployeesinhotel);
// ----------------- Employee Router --------------- //
// ----------------- Contact US Router --------------- //
router.post("/addcontactus", contactcontroller.addcontactmessage);
router.post("/gethotelcontaactus", contactcontroller.getconactforhotel);
router.post("/deletecontactwemail", contactcontroller.Deletecontactwemail);

// ----------------- Contact US Router --------------- //

// ----------------- Request Router --------------- //
router.get("/addrequest", Requestcontoller.addRequestget); //get IN URL QUERY
router.post("/addrequest", Requestcontoller.addRequest);  //post IN JSON BODY 
router.get("/getrequest", Requestcontoller.getRequests); //get All  Request In DB
router.get("/gethotelrequest", Requestcontoller.gethotelrequest); //Get ALL Hotel Request
router.delete("/deleterequestid", Requestcontoller.deleterequestID) //delete Request By ID IN BODY 
router.delete("/deletehotelrequest", Requestcontoller.DeleteHotelRequests) //delete Request By Hotel IN BODY 
// ----------------- Request Router --------------- //
// ----------------- Booking Router --------------- //
router.get("/getallbooking", BookingController.GetallBooking) //get All Booking
router.get("/gethotelbooking", BookingController.GethotelBooking) //get All Booking For One Hotel
router.get("/acceptbooking", BookingController.Addbooking)
// ----------------- Booking Router --------------- //



module.exports = router;