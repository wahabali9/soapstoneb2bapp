import jwt from "jsonwebtoken";
import { signupmodel } from "../models/singnupmodel";

export const authmiddlewaew = async (req, res, next) =>{
  try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return(res.status(401).json({success: false, message: "Unauthorized access"}))
    }
    const decodes = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await signupmodel.findById(decodes.id).select("-password")

    return next()
  } catch (error) {
    return res.status(401).json({success: false, message: "Unauthorized access"})
  }


}