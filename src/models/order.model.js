const mongoose = require('mongoose');
const statusEnum = ['Pending', 'packed', 'Shipped', 'Delivered', 'Cancelled'];
const orderSchema = mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    items : [{ 
        product_id : {type: mongoose.Schema.Types.ObjectId, ref : "Product", required : true},
        quantity : {type : Number, required : true},
        price_at_purchase : { type : Number, required : true }
    }],
    order_total : { type : Number, required : true},
    order_status : { type : String, enum : statusEnum, required : true, default : 'Pending' },
    paymentMethod : {
        type : String,
        enum : ['credit_card', 'debit_card', 'UPI', 'COD' ],
        required : true
    },
    paymentStatus : {
        type : String,
        enum : ['processing','successfull','cancelled' ],
        deafult : "processing"
    }

}, {
        timestamps : true
});
module.exports = mongoose.model('Order', orderSchema);
