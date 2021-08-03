const passport = require("passport");
require("../controller/passport")
const validator = require("validator");

const loginuser = async (req, res, next) => {
    let { email, password } = req.query;
    if (!email || !password) {
        res.json({ message: "PLease Enter All FIlds" })
    } else if (!validator.isEmail(email)) {
        res.json({ message: "Please Enter A Valid Email" })
    }
    else {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.json({ info }); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.status(200).json({ user, message: "SUCESS LOGIN" });
            });
        })(req, res, next);
    }

}

module.exports = {
    loginuser: loginuser
}