const Product = require("../models/product.model");
const createProduct = async (req, res) => {
  try {
 
    const { name, type, price, ratings } = req.body;
    const image  = req.files;
 
    if(!image){
      res.status(404).send('cannot read the file');
    }
    const file = req.files[0];
    const newfilepath = file.filename;
    console.log(newfilepath);
    const base_url = "http://localhost:3000/upload/"
    const imageurl = base_url + newfilepath;
 
    const images = req.files;
    console.log(images);
    if(!images){
      return res.status(400).send("File is not read");
    }
    const imageurls = [];
    images.forEach((file, index) => {
      const filepath = file.filename;
      const base_url = "http://localhost:3000/upload/";
      const imageurl = base_url + filepath;
      imageurls.push(imageurl);
      console.log(` ${index +1}. filename : ${file.originalname}`);
    })

    const newproduct = {
      name,
      type,
      price,
      ratings,
      image:imageurl,
      images : imageurls
    };
    const updateproduct = await new Product(newproduct).save();
    res.status(200).json({message:'data is retrieved',data:updateproduct});
 
  } catch (err) {
    res.status(500).send("internal serval error");
  }
};

const updateProduct = async(req, res) => {
    const productId = req.params.id;
    if(!productId) {
      return res.status(404).send("Product Id not found");
    }
    const { brand, description, discount, stock} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId,
        {brand, description, discount, stock}
    );
    res.status(200).json(updatedProduct);

}
 
module.exports = { 
  createProduct,
  updateProduct
 };

