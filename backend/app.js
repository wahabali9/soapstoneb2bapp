import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/dbconnect.js";
import cookieparser from "cookie-parser";
import orderroutes from "./routes/orderroutes.js";
import authroutes from "./routes/authroutes.js";
import adminroutes from "./routes/adminroutes.js";
import adminauthroutes from "./routes/adminauthroutes.js";
import cors from "cors";

dotenv.config();
const app = express();

dbconnect();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Frontier Stone API is running" });
});

app.use("/api/order", orderroutes);
app.use("/api/user", authroutes);
app.use("/api/admin", adminroutes);
app.use("/api/wahabaliadmin", adminauthroutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});