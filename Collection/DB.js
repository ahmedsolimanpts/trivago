const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
//Start Hotel Schema
const HotelSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admins: {
        type: Schema.ObjectId, //Super Admin Can Add admin with him or Not
        ref: "user",
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const hotel = mongoose.model("hotel", HotelSchema)
//End Hotel Schema
// Start User Schema
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'super-admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
    }, hotel_admin: {
        type: Schema.ObjectId,
        ref: "admin"
    }

});
UserSchema.index({ email: 1 }, { unique: true })

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash;
        next();
    }
    catch (err) {
        console.log(err)
    }

})
const user = mongoose.model("user", UserSchema);

// End User Schema
// Start Admin Schema
const AdminSchema = Schema({
    email: {
        type: String,
    },
    hotel_id: {
        type: Schema.ObjectId,
        ref: "hotel"
    }
})
const admin = mongoose.model("admin", AdminSchema)
//End Admin Schema
// Start Department Schema
const DepartmentSchema = Schema({
    name: {
        type: String,
    },
    hotel_id: {
        type: Schema.ObjectId,
        ref: "hotel"
    }
})
const Department = mongoose.model("Department", DepartmentSchema)
//End Department Schema
// Start Contact Us Schema
const ContactusSchema = Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "user"
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel"
    }
})
const contactus = mongoose.model("contactus", ContactusSchema)
//End Department Schema
// Start Room Us Schema
const RoomSchema = Schema({
    roomid: {
        type: String,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel"
    },
    floor: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    }
})
const room = mongoose.model("room", RoomSchema)
//End Room Schema
// Start offer Us Schema
const OffersSchema = Schema({
    from: {
        type: Date,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel"
    },
    to: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    decription: {
        required: true,
        type: String
    }
})
const offer = mongoose.model("offer", OffersSchema)
//End offer Schema
// Start Request Us Schema
const RequestSchema = Schema({
    from: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: "user"
    }, inoffer: {
        type: Boolean,
        default: 0,
        required: true
    },
    offer: {
        type: Schema.ObjectId,
        ref: "offer"
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel"
    },
    to: {
        type: Date,
        required: true
    },
    salary: {
        type: String,
    },
    room: {
        type: Schema.ObjectId,
        ref: "room"
    }
})
const Request = mongoose.model("Request", RequestSchema)
//End Request Schema
// Start Employee  Schema
const EmployeeSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel",
        required: true
    },
    salary: {
        type: String,
    },
    Department: {
        type: Schema.ObjectId,
        ref: "Department",
        required: true
    }
})
const Employee = mongoose.model("Employee", EmployeeSchema);
//End Employee Schema
// Start Attendence  Schema
const AttendenceSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "user"
    },
    acction: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    },
    hotel: {
        type: Schema.ObjectId,
        ref: "hotel",
        required: true
    },
})
const Attendence = mongoose.model("Attendence", AttendenceSchema);
//End Attendence Schema
module.exports = {
    hotel: hotel,
    user: user,
    admin: admin,
    contactus: contactus,
    room: room,
    offer: offer,
    Request: Request,
    Department: Department,
    Attendence: Attendence,
    Employee: Employee
}
