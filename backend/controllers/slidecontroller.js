import { slidermodel } from "../models/slidermodel.js";
import cloudinary from "../config/cloudinary.js";

// get all slider banner
const getsliders = async (req, res) => {
    try {
        const sliders = await slidermodel.find().sort({ createdAt: -1 })
        res.status(200).json({ success: true, sliders })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while fetching sliders", error: error.message })
    }
}

// add new slider banner
const addslider = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a slider image",
      });
    }

    const filebase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const upload = await cloudinary.uploader.upload(filebase64, {
      folder: "sliders",
      resource_type: "image",
      timeout: 60000
    });

    if (!upload || !upload.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary did not return a secure image URL",
      });
    }
 
    const newslider = new slidermodel({
      title,
      description,
      imageurl: upload.secure_url, 
      tag: tag || "Announcement",
    });

    await newslider.save();

    return res.status(201).json({
      success: true,
      message: "Slider added successfully",
      newslider,
    });
  } catch (error) {
    console.error("SLIDER CATCH ERROR:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Error while adding slider",
        error: error?.message || "Unknown error",
      });
    }
  }
};

    // delete slider banner
    const deleteslider = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedslider = await slidermodel.findByIdAndDelete(id)
            if (!deletedslider) return res.status(404).json({ success: false, message: "slider not found" })
            res.status(200).json({ success: true, message: "slider deleted successfully" })
        } catch (error) {
            res.status(500).json({ success: false, message: "error deleting slider banner", error: error.message })
        }
    }

 export { getsliders, addslider, deleteslider }