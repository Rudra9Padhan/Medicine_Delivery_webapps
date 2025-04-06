import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://rudrapadhan:93745219@cluster0.zfyro.mongodb.net/medicine_delivery_webapps').then(()=>console.log("Db connected"));
}