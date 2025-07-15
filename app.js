const express = require("express");
const upload = require('./src/multer');
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");

const app = express();

app.use(express.json());
app.use(upload.any());

app.use('/upload', express.static('upload'));

// app.use("/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);



module.exports = app;
