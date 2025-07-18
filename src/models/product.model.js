const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    stock: { type: Number },
    image: { type: String },
    images: [String],
    ratings: { type: Number, required: true },
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : 'true'
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
