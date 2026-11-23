import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/dbconnect.js";
import cookieparser from "cookie-parser";
import orderroutes from "./routes/orderroutes.js"
import authroutes from "./routes/authroutes.js"
import adminroutes from "./routes/adminroutes.js"
import adminauthroutes from "./routes/adminauthroutes.js"
import cors from "cors";

dotenv.config()
const app = express()

dbconnect()

app.use(cors({
    origin: ["https://your-frontend-domain.vercel.app", "http://localhost:3000"],
    credentials: true
}));
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/order", orderroutes)
app.use("/api/user", authroutes)
app.use("/api/admin", adminroutes)
app.use("/api/wahabaliadmin", adminauthroutes)
const port = process.env.PORT
app.listen(port, ()=>{
    console.log("app is runing ", port);
    
})