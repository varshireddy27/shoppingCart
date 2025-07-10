const mongoose = require('mongoose');
const reviewsSchema =new mongoose.Schema({
    title : { type : String, required : true},
    rating : { type : Number, min : 1, max : 5,default : 0, required : true},
    description : { type : String},
    user_id : {type: mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    product_id : {type: mongoose.Schema.Types.ObjectId, ref : "Product", required : true}
}, {
    timestamp : true
});
module.exports = mongoose.model('Reviews', reviewsSchema);