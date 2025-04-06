import medicineModel from "../models/medicineModel.js";
import fs from 'fs';


//add medicine

const addmedicine = async (req,res) =>{


    let image_filename = req.file ? req.file.filename :'';


    const medicine = new medicineModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try {
        await medicine.save();
        res.json({success:true,message:"Medicine added"})
    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"});
    }

}
//all medicine list
const listmedicine = async(req,res)=>{
 try{
    const medicines = await medicineModel.find({});
    res.json({success:true,data:medicines });
 }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
 }
}

//removed medicine from the list
const  removeMedicine = async (req,res) =>{

    try{
        const medicine = await medicineModel.findById(req.body.id);
        fs.unlink(`uploads/${medicine.image}`,(err)=>{
       if(err){
        console.log(err);
        res.json({ success:false, message:"Error deleting image file "});
       }
        });

        await medicineModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Medicine removed"})
}catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});

}
};
export {addmedicine, listmedicine, removeMedicine};