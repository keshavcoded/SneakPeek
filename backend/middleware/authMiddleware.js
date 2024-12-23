import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";
export const authMiddleware = async (req,res,next) => {
    try {
        const token = await req.cookie("jwt-token");
        if(!token){
            return res.status(401).json({ success: false, message: "JWT token not found"});
        }
        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({success: false, message: "Authorization failed -Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in authourization middleware: ", error.message);
        return res.status(500).json({success: false, message:"Internal server error"});
    }
}