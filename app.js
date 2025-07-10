const express = require("express");

const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const upload = require("./src/multer");
const app = express();

app.use(upload.any());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

module.exports = app;
