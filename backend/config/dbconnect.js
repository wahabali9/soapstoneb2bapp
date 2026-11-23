import mongoose from "mongoose"

const dbconnect = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db connect");
        
    } catch (error) {
        console.log("db connection falid", error.message);
        process.exit(1)
        
    }
    
}


export default dbconnect