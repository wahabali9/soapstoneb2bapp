import mongoose from "mongoose";


const sliderschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "Announcement"
    }
}, {timestamps: true})

export const slidermodel = mongoose.model("slider", sliderschema)