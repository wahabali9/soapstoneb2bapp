import mongoose from "mongoose";

const productschema = new mongoose.Schema({
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
    purityorbrightness: {
        type: String,
        required: true
    },
    category: {
        type: String,
        defalt: "mineral"
    }
}, {timestamps: true})

export const productmodel = mongoose.model("product", productschema)