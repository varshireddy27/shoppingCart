const jwt = require('jsonwebtoken');
const verifyToken = async(req, res, next) => {
      try {
        // get the bearer token
        const authorization = req.headers.authorization;
        if (!authorization) {
          res.status(401).send("Token is missing");
        }
        const token = authorization.split(" ")[1];
        const user = jwt.verify(token, "abcd123456");
    
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        
        req.user = user;
        console.log(user);
        next();
      } catch (err) {
        return res.status(500).json({ message: "Unauthorized" });
      }
}
module.exports = verifyToken;