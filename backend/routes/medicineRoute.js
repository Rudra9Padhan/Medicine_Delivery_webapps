import express from "express"
import { addmedicine,listmedicine,removeMedicine} from "../controllers/medicineController.js"
import multer from "multer"


const medicineRouter = express.Router();

//image storage
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
 const upload = multer({storage:storage})

medicineRouter.post("/add",upload.single("image"),addmedicine)
medicineRouter.get("/list",listmedicine)
medicineRouter.post("/remove",removeMedicine);


 
export default medicineRouter;
