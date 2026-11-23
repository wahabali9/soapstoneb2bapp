import { adminmodel } from "../models/adminmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 📝 1. REGISTER ADMIN
const registeradmin = async (req, res) => {
    try {
        // Check if admin already exist (Only one owner allowed)
        const existingadmin = await adminmodel.findOne();
        if (existingadmin) {
            return res.status(403).json({
                success: false, 
                message: "Access Denied, Admin already exist, only one owner is allowed"
            });
        }

        const { username, email, password } = req.body;
        
        // 🔑 Fixed: added 'await' to genSalt
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newadmin = new adminmodel({
            username,
            email: email.toLowerCase(),
            password: hashedpassword
        });

        await newadmin.save();
        
        res.status(201).json({
            success: true, 
            message: "Admin created successfully", 
            newadmin: { username: newadmin.username, email: newadmin.email }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error during admin register", 
            error: error.message
        });
    }
};

// 🔐 2. LOGIN ADMIN (Token Generation Added)
const loginadmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const admin = await adminmodel.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Invalid admin credentials" });
        }

        // Check password match
        const ismatch = await bcrypt.compare(password, admin.password);
        if (!ismatch) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        // 🎟️ Generate JWT Token (Expires in 1 day or as per your need)
        const token = jwt.sign(
            { id: admin._id, email: admin.email }, 
            process.env.ADMIN_JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true, 
            message: "Admin login successful", 
            token, // 🔑 Token response mein bhej diya gaya hai
            admin: { username: admin.username, email: admin.email }
        });

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error during admin login", 
            error: error.message
        });
    }
};

export { registeradmin, loginadmin };