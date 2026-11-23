import express from 'express';
import { getproducts, addproduct, updateproduct, deleteproduct } from '../controllers/admincontroller.js';
import { getsliders, addslider, deleteslider } from '../controllers/slidecontroller.js';

const router = express.Router();

router.get("/products", getproducts)
router.post("/addproduct", addproduct)
router.put("/updateproduct/:id", updateproduct)
router.delete("/deleteproduct/:id", deleteproduct)

// slider routes
router.get("/sliders", getsliders)
router.post("/addslider", addslider)
router.delete("/deleteslider/:id", deleteslider)

export default router
