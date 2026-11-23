import { slidermodel } from "../models/slidermodel.js";

// get all slider banner
const getsliders = async (req, res) =>{
    try {
        const sliders = await slidermodel.find().sort({ createdAt: -1}) 
        res.status(200).json({success: true, sliders})
    } catch (error) {
        res.status(500).json({success: false, message: "Error while fetching sliders", error: error.message})
    }
}

// add new slider banner
const addslider = async (req, res) => {
    try {
        const {title, description, imageurl, tag} = req.body;
        const newslider = new slidermodel({
            title, 
            description,
            imageurl,
            tag
        });
        await newslider.save()
        res.status(201).json({success: true, message: "slider added successfully", newslider})
    } catch (error) {
        res.status(500).json({success: false, message: "Error while adding slider", error: error.message})
    }
}

// delete slider banner
const deleteslider = async (req, res) =>{
    try {
        const {id} = req.params;
        const deletedslider = await slidermodel.findByIdAndDelete(id)
        if(!deletedslider) return res.status(404).json({success: false, message:"slider not found"})
            res.status(200).json({success: true, message: "slider deleted successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "error deleting slider banner", error: error.message})
    }
}

export { getsliders, addslider, deleteslider }