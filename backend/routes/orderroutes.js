import express from "express"
import { createorder, trackorder, updateorderstatus } from "../controllers/ordercontroller.js"
const router = express.Router()

router.post("/create", createorder)



router.get("/track/:trackingId", trackorder)

router.put("/update/:trackingId", updateorderstatus)

export default router