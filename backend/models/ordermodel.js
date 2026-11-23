import mongoose from "mongoose";

const orderschema = new mongoose.Schema({

   trackingId: {
        type: String,
        required: true,
        unique: true // Taake search karne ke liye har tracking number alag ho
    },

    fullname:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        lowercase: true,
        validate:{
            validator: function (value){
                   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
             message: props => `${props.value} is not a valid email!`
        }
    },

    phonenumber:{
        type: String,
        required:true,
    },

    organisationname:{
        type: String,
        required: true,
    },

    orderquanitity:{
        type:String,
        required:true,
    },

    location:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        required: true,
        enum: ['Hattar Yard', 'On the way', 'Delivered'], // Enum values for status
        default: 'Hattar Yard' // Default value for status
    }

}, {timestamps: true})

export const ordermodel = mongoose.model("Order", orderschema)