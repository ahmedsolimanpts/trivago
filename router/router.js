const router = require("express").Router();
const userController = require("../controller/user");
const HotelController = require("../controller/hotel");
const offercontroller = require("../controller/offer");
const roomcontroller = require("../controller/room");
const departmentcontroller = require("../controller/depart");
const empcontroller = require("../controller/employee");
const contactcontroller = require("../controller/contactus");
const Requestcontoller = require("../controller/request");
const BookingController = require("../controller/booking");
const checkavability = require("../controller/checkavability");
const authinticate = require("../controller/authinticate")


// ----------------- User Router --------------- //
router.get("/getalluser", userController.GetAlluser); //GET ALL USER
router.get("/getuserbyid", userController.GetuserBYID) //GET USER BY ID
router.get("/adduser", userController.AddUser);  //ADD NEW USER
// ----------------- User Router --------------- //
// ----------------- Hotel Router --------------- //
router.get("/getallhotels", HotelController.GetAllHotels); // GET ALL HOTELS
router.get("/getonehotelid", HotelController.gethotelwithid); //GET ONE HOTEL USING ID IN BODY
router.get("/getonehotelname", HotelController.GetHotelwithname); //GET HOTEL USING THE NAME
router.get("/addhotel", HotelController.AddHotel);  //ADD NEW HOTEL
router.post("/deletehotel", HotelController.deletehotel); //DELET THE HOTEL
// ----------------- Hotel Router --------------- //
// ----------------- Offer Router --------------- //
router.post("/gethoteloffer", offercontroller.GetOfferForOneHotel);
router.get("/getalloffers", offercontroller.GetAllOffer);
router.post("/addoffer", offercontroller.AddOffer);
router.post("/deleteoffer", offercontroller.DeleteOffer);
// ----------------- Offer Router --------------- //
// ----------------- Room Router --------------- //
router.get("/getrooms", roomcontroller.Getallroom); //GET ALL ROOMS
router.post("/addroom", roomcontroller.Addroom); //ADD NEW ROOM
router.post("/deleteroom", roomcontroller.Deleteroom); //DELETE ROOM IN HOTEL
router.post("/getallroomhotel", roomcontroller.Getroomforonehotel); //GET ALL ROOMS IN ONE HOTEL
// ----------------- Room Router --------------- //
// ----------------- Department Router --------------- //
router.post("/adddepartment", departmentcontroller.addDepartment); //ADD NEW DEPARTMENT IN HOTEL
router.post("/gethdepart", departmentcontroller.getdepartinhotel); // GET ALL DEPARTMENT IN ONE HOTEL
// ----------------- Department Router --------------- //
// ----------------- Employee Router --------------- //
router.post("/addemp", empcontroller.addemployee); //ADD NEW EMPLOYEE IN HOTEL
router.post("/hotelemp", empcontroller.getemployeesinhotel); //GET ALL EMPLOYEE IN HOTEL
// ----------------- Employee Router --------------- //
// ----------------- Contact US Router --------------- //
router.post("/addcontactus", contactcontroller.addcontactmessage); //ADD NEW CONTACT TO HOTEL
router.post("/gethotelcontaactus", contactcontroller.getconactforhotel); //GET CONTACT MESSAGE FOR ONE HOTEL
router.post("/deletecontactwemail", contactcontroller.Deletecontactwemail); //DELET ONE MESSAGE FOR ONE USER
// ----------------- Contact US Router --------------- //
// ----------------- Request Router --------------- //
router.get("/addrequest", Requestcontoller.addRequestget); //get IN URL QUERY
router.post("/addrequest", Requestcontoller.addRequest);  //post IN JSON BODY 
router.get("/getrequest", Requestcontoller.getRequests); //get All  Request In DB
router.get("/gethotelrequest", Requestcontoller.gethotelrequest); //Get ALL Hotel Request
router.get("/getonerequest", Requestcontoller.getonerequest); //Get ONE Request QUERY
router.delete("/deleterequestid", Requestcontoller.deleterequestID) //delete Request By ID IN BODY 
router.delete("/deletehotelrequest", Requestcontoller.DeleteHotelRequests) //delete Request By Hotel IN BODY 
// ----------------- Request Router --------------- //
// ----------------- Booking Router --------------- //
router.get("/getallbooking", BookingController.GetallBooking) //get All Booking IN DB
router.get("/gethotelbooking", BookingController.GethotelBooking) //get All Booking For One Hotel
router.get("/getbookingbyid", BookingController.GetAllbookingbyrequestid);
router.get("/acceptbooking", BookingController.Addbooking)
// ----------------- Booking Router --------------- //
// ----------------- Avilabilty Router --------------- //
router.get("/chekonehotel", checkavability.checkinonehotel);
// ----------------- Avilabilty Router --------------- //
// ----------------- LOGIN Router --------------- //

router.get('/login', authinticate.loginuser); // LOG IN TO THE SYSTEM
// ----------------- LOGIN Router --------------- //
// ----------------- ATTENDENCE Router --------------- //

router.post('/attendence/login', empcontroller.attendEmployee);  // STORE USER ATTEND TO WORK TIME
router.post('/attendence/leave', empcontroller.leaveemployee);   // STORE USER LEAVE TO WORK TIME
router.get('/getoneuserattendlog', empcontroller.GetAllTransactiontooneuser); //GET ALL TRANSACTION FOR ONE USER
// ----------------- ATTENDENCE Router --------------- //

module.exports = router;