import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";

const userAuth = async (req,res,next)=>{
    try{
        const token = req?.cookies?.jwtToken;
        if(!token){
            throw new ApiError("Session Ended",400);
        }
        const decoded = await jwt.verify(token,process.env.PRIVATE_KEY);
        const user = await User.findById(decoded?.user_id).select("-password");
        if(!user){
            throw new ApiError("User Not found",404);
        }
        req.user = user;
        next()
    }catch(err){
        next(err);
    }
}

export {userAuth};