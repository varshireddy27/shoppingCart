const mongoose = require('mongoose');
const addressEnum = ["home", "work", "other"]
const roleEnum = ['user', 'admin','seller'];
const userSchema = new mongoose.Schema ({
    firstName : { type : String},
    lastName : { type : String},
    mobile_no : { type :Number, unique : true},
    email : { type : String, unique : true, required : true},
    password : { type : String, required : true},
    address : [
        {
            address_line1 : { type : String},
            landmark : { type : String},
            pin : { type : Number},
            city : { type : String},
            state : { type : String},
            address_type : {type : addressEnum, default : 'home', required : true}  
        }
    ],
    role : { type : roleEnum, default : 'user', required : true}
})
module.exports = mongoose.model('User', userSchema);