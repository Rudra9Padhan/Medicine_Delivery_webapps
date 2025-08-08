import mongoose from "mongoose";

export const connectDB = async ()=>{
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Db connected"))
        .catch((err) => console.error("Db connection error:", err));
}