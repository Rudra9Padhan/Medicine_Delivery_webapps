import React, { useState } from 'react';
import './Add.css';
import {assets} from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {


const [image,setImage] = useState(false);
const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Cough & Cold"
});

const onChangeHandler =(event)=>{
   const name = event.target.name;
   const value = event.target.value;
   setData(data=>({...data,[name]:value}))
}
const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('price',Number(data.price));
    formData.append('category',data.category);
    formData.append('image',image);
    const response = await axios.post(`${url}/api/medicine/add`,formData);
    if(response.data.success){
        setData({
            name:"",
            description:"",
            price:"",
            category:"Cough & Cold"
        })
        setImage(false)
     toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message) 
    }
};


  return (
    <div>
    <div className="add">
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder="Write the contents"></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category">
                        <option value="Ayurvedic">Ayurvedic</option>
                        <option value="Cough & Cold">Cough & Cold</option>
                        <option value="Stomach Care">Stomach Care</option>
                        <option value="Diabetic Care">Diabetic Care</option>
                        <option value="First Aid" > First Aid</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='20'/>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
    </div>
  );
};

export default Add;
