const userModel = require("../models/user.model");

const sellerMiddleware = async(req, res, next) => {
    // gegt the userId first
    // const userId = req.user.id;

    // // get the user deatils
    // const userDetail = await userModel.findById(userId);
    // console.log("User details in authorization", userDetail);
    
    // const userRole = userDetail.role;

    const userRole = req.user.role;
    if(userRole !== 'seller') {
        return res.status(403).send("Only Seller can update products");
    }
    next();
}
module.exports = sellerMiddleware;