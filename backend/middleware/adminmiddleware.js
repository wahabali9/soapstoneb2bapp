import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        
        // Agar token valid hai toh request aage proceed karegi
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}; 