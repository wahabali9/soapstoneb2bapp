import { signupmodel } from "../models/singnupmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupcontroller = async (req, res) =>{
    try {

        const { fullname, email, password, isorganisations} = req.body;
        // check if user already exists
        const userexists = await signupmodel.findOne({email: email.toLowerCase()});

        if(userexists){
            return res.status(400).json({success: false, message: "User already exists"})
        }

        // hash and bcrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = new signupmodel({
            fullname,
            email: email.toLowerCase(),
            password: hashedpassword,
            isorganisations
        })

        await newuser.save();

        res.status(201).json({success: true, message: "User created successfully", newuser})
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}


export const logincontroller = async (req, res) =>{

    try {
        const {email, password} = req.body;
        // find user by emaol

        const user = await signupmodel.findOne({email: email.toLowerCase()});
        if(!user){
            return res.status(404).json({success: false, message: "Invalid credentials"})
        }
        // match password

        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }
        // secure jwt token generate
        const token = jwt.sign({id: user._id, }, process.env.JWT_SECRET, {expiresIn: "3d"});

       res.cookie("token", token)
       
        res.status(200).json({success: true, message: "Login successful", token, user:{fullname: user.fullname, email: user.email}})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}