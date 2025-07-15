const sellerMiddleware = async(req, res, next) => {
    if(req.user.role !== 'seller') {
        return res.status(403).send("Only Seller can update products");
    }
    next();
}
module.exports = sellerMiddleware;