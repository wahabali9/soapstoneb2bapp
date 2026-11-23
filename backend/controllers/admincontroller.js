import {productmodel} from "../models/productmodel.js"
import cloudinary from "../config/cloudinary.js"

// get all products (for frontend)
const getproducts = async (req, res) => {
    try {
        const products = await productmodel.find().sort({ createdAt: -1 })
        res.status(200).json({ success: true, products })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while fetching products", error: error.message })
    }
};

// add new product (for admin)

const addproduct = async (req, res) => {
    try {
        const { title, description,  purityorbrightness, category } = req.body;
        if(!req.file){
            return res.status(400).json({success: false, message: "please upload a product image"})
        }

        // buffer to base64 string
        const filebase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        const uploadresponse = await cloudinary.uploader.upload(filebase64, {folder: "products"})
        const newproduct = new productmodel({
            title,
            description,
            imageurl: uploadresponse.secure_url,
            purityorbrightness,
            category
        })
        await newproduct.save();
        res.status(201).json({success: true, message: "product added successfully", newproduct})
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while adding product", error: error.message })
    }
}


// update product (for admin)

const updateproduct = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedproduct = await productmodel.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedproduct) return res.status(404).json({success: false, message: "product not found"})
        res.status(200).json({success: true, message: "product updated successfully", updatedproduct})
    } catch (error) {
        res.status(500).json({success: false, message:"Error while update product", error: error.message})
    }
}


const deleteproduct = async (req, res) => {
try {
    const {id} = req.params;
    const deletedproduct = await productmodel.findByIdAndDelete(id)
    if(!deletedproduct) return res.status(404).json({success: false, message: "product not found"})
        res.status(200).json({success: true, message:"product deleted successfully"})
} catch (error) {
    res.status(500).json({success: false, message:"error while delete product", error: error.message})
}
}

export {getproducts, addproduct, updateproduct, deleteproduct}