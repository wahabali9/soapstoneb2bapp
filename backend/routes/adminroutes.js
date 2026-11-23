import express from 'express';
import { upload } from '../config/cloudinary.js';
import { getproducts, addproduct, updateproduct, deleteproduct } from '../controllers/admincontroller.js';
import { getsliders, addslider, deleteslider } from '../controllers/slidecontroller.js';
import { adminAuth } from '../middleware/adminmiddleware.js';

const router = express.Router();

router.get("/products", getproducts)
router.post("/addproduct", adminAuth, upload.single("image"), addproduct)
router.put("/updateproduct/:id", adminAuth, updateproduct)
router.delete("/deleteproduct/:id", adminAuth, deleteproduct)

// slider routes
router.get("/sliders", getsliders)
router.post("/addslider", adminAuth, upload.single("image"), addslider)
router.delete("/deleteslider/:id", adminAuth, deleteslider)

export default router 
