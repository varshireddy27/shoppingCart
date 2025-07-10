const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abcd123456";
const createUser = async(req, res)=> {
    try {
        const { firstName, lastName, mobile_no, email, address, role} = req.body;
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
        res.status(200).json(result);
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
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
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
const updateUser = async(req, res) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).send('Token is Missing');
        }
        const token = authorization.split(" ")[1];
        const user = jwt.verify(token, "abcd123456");
        const userID = user.id;
        console.log(userID);
        res.json("User details retreived");
        const { firstName, lastName, address} = req.body;
        const updatedData = {firstName, lastName, address};
        const updatedUser = await User.findByIdAndUpdate(userID, updatedData);
        if(!updatedUser) {
            return res.status(400).send("User not found");
        }
        return res.status(200).json(updatedUser);
    } catch(err) {
        res.status(500).send("Internal server error")
    }
}
module.exports = { 
    createUser,
    userLogin,
    getUser,
    updateUser
};