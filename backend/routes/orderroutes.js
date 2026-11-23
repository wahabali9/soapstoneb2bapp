import express from "express"
import { createorder, getorder, trackorder, updateorderstatus } from "../controllers/ordercontroller.js"
import { adminAuth } from "../middleware/adminmiddleware.js"
const router = express.Router()

router.post("/create", createorder)

router.get("/getorders", adminAuth,  getorder)

router.get("/track/:trackingId", trackorder)

router.put("/update/:trackingId", updateorderstatus)

export default router