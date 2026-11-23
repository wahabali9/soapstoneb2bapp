import { ordermodel } from "../models/ordermodel.js";

export const createorder = async (req, res) => {
    try {
        const { fullname, email, phonenumber, organisationname, orderquanitity, location } = req.body;
        // Auto-generate a unique B2B alpha-numeric tracking ID
        const trackingId = "FS-" + Math.floor(100000 + Math.random() * 900000)

        const neworder = new ordermodel({
            trackingId,
            fullname,
            email,
            phonenumber,
            organisationname,
            orderquanitity,
            location
        })

        await neworder.save();
        res.status(201).json({ success: true, message: "Order created successfully", neworder })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error during order creation try again", error: error.message })
    }
}

export const getorder = async (req, res) => {
    try {
        const orders = await ordermodel.find().sort({createdAt: -1})
        return res.status(200).json({
            success: true,
            orders
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error fetching orders",
            message: error.message
        })
    }
}

export const trackorder = async (req, res) => {
    try {
        const { trackingId } = req.params;
        const order = await ordermodel.findOne({ trackingId: trackingId.toUpperCase() })

        if (!order) {
            return res.status(404).json({ success: false, message: "no active order " })
        }

        res.status(200).json({
            success: true,
            status: order.status,
            organisation: order.organisationname,
            quantity: order.orderquanitity,
            destination: order.location,
            name: order.fullname,
            lastupdated: order.updatedAt
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error while tracking order", error: error.message })
    }
}


export const updateorderstatus = async (req, res) => {
    try {
        const { trackingId } = req.params;
        const { status } = req.body;
        // check validation if status in our state
        const validstatus = ["Hattar Yard", "On the way", "Delivered"]
        if (!validstatus.includes(status)) {
            return res.status(400).json({ success: false, message: "invalid status" })
        }

        // database update
        const order = await ordermodel.findOneAndUpdate(
            { trackingId: trackingId.toUpperCase() },
            { status: status, updatedAt: Date.now() }, {new: true} // return the updated document
            )

            if(!order){
                return res.status(404).json({success:false, message: "order not found try again"})
            }
            res.status(200).json({
                success: true, 
                message: "order status updated successfully", 
                currentstatus: order.status})

    } catch (error) {
        res.status(500).json({ success: false, message: "Error while updating order status", error: error.message })
    }


}