const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    items : [{
        product_id : {type: mongoose.Schema.Types.ObjectId, ref : "Product", required : true},
        quantity : {type : String, required : true, default : 1}
    }]
}, {
    timestamp : true
});
module.exports = mongoose.model('Cartcollection',cartSchema);




