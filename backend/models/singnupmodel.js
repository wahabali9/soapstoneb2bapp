import mongoose from "mongoose";

const signupschema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email!`
        }

    },

    password: {
        type: String,
        required: true,

    },

    isorganisations: {
        type: Boolean,
        required: true
    },
}, {timestamps: true})

export const signupmodel = mongoose.model("User", signupschema)