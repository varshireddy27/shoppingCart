const mongoose = require('momgoose');
const statusEnum = ['Pending', 'Proccessed', 'Shipped', 'Delivered', 'Cancelled'];
const orderSchema = mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    items : [{ 
        product_id : {type: mongoose.Schema.Types.ObjectId, ref : "Product", required : true},
        quantity : {type : Number, required : true},
        price_at_purchase : { type : Number, required : true }
    }],
    order_placed : { type : String, required : true},
    order_total : { type : Number, required : true},
    status : { type : statusEnum, required : true, default : 'Pending' },
    paymentMethod : {
        type : String,
        enum : ['credit_card', 'debit_card', 'UPI', 'COD' ],
        required : true
    }
}, {
        timeStamp : true
});
module.exports = mongoose.model('Order', orderSchema);
