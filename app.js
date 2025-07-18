const express = require("express");
const upload = require('./src/multer');
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const cartRouter = require("./src/routes/cart.routes");
const orderRouter = require('./src/routes/order.routes');
const sellerRouter = require("./src/routes/seller.route");
const verifyToken = require("./src/middelwares/authentication");
const sellerMiddleware = require('./src/middelwares/authorization');

const app = express();

app.use(express.json());
app.use(upload.any());

app.use('/upload', express.static('upload'));

// app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use('/api/cart', verifyToken, cartRouter);
app.use('/api/order',verifyToken,orderRouter );
app.use('/api/seller', verifyToken, sellerMiddleware, sellerRouter);



module.exports = app;
