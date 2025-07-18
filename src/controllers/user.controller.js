const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abcd123456";
const createUser = async(req, res)=> {
    try {
        const { firstName, lastName, mobile_no, email} = req.body;
        const user = await User.findOne({ user: email });
        if (user) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const normalPassword = req.body.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(normalPassword, saltRounds);
        const newUser = {
            firstName,
            lastName,
            mobile_no,
            email,
            password : hashedPassword
        };
        const result = await new User(newUser).save();
        const resObj = {
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email
        }
        res.status(200).json({message : "User created succefully", data : resObj});
    } catch (err) {
        res.status(500).send('Internal Server error');
    }

}
const userLogin = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id , role: user.role}, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).send ("Internal server error");
    }
}
const getUser = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401).send("Token is missing");
    }
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, "abcd123456");
    const userID = user.id;
    console.log(userID);
    res.json("User details retreived");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Unauthorized" });
  }
};
const updateuser = async(req,res)=>{
    //  try{
        const auth = req.headers.authorization;
        if(!auth){
            return res.status(400).send('invalid token');
        }
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token,'abcd123456')
        const userId = decoded.id
        if(!userId){
            return res.status(400).send('userid is invalid');
        }
        const { firstname, lastname, address } = req.body;
        const userData = { firstname, lastname, address};
        const updatedData = await User.findByIdAndUpdate(userId, userData, {
            new: true,
    });
 
    if (!updatedData) {
      return res.status(404).send("invalid data");
    }
    return res
      .status(200)
      .json({ message: "data retrieved successfully", data: updatedData });
    // }catch(err){
    //     return res.status(500).send('internal server error')
    // }
}


module.exports = { 
    createUser,
    userLogin,
    getUser,
    updateuser
};