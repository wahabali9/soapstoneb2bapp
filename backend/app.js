import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/dbconnect.js";
import cookieparser from "cookie-parser";
import orderroutes from "./routes/orderroutes.js"
import authroutes from "./routes/authroutes.js"
import adminroutes from "./routes/adminroutes.js"
dotenv.config()
const app = express()

dbconnect()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/order", orderroutes)
app.use("/api/user", authroutes)
app.use("/api/admin", adminroutes)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log("app is runing ", port);
    
})