import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
});

const medicineModel = mongoose.models.medicine || mongoose.model("medicine",medicineSchema);


export default medicineModel;