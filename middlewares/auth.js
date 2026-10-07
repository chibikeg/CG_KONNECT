const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {
        let token;

        const authorization = req.headers.authorization;
        if(authorization && authorization.startsWith("Bearer ")){
            token = authorization.split(" ")[1]
        }

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)

        if(!user){
             return res.status(401).json({
                success: false,
                message: "User no longer exists"
            })
        }

        if(!user.isActive){
             return res.status(403).json({
                success: false,
                message: "Your Account is inactive"
            })
        }

        req.user = user;

        next();
    } catch (error) {
         return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            })
    }
}

module.exports = protect;