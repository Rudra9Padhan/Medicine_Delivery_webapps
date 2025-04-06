import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({url}) => {

  
  const [list,setlist] = useState([]);

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/medicine/list`);
    
    if(response.data.success){
      setlist(response.data.data);
    }
    else {
      toast.error("Error");
      
    }
  };

  const removeMedicine = async(medicineId) =>{
 const response = await axios.post(`${url}/api/medicine/remove`,{id:medicineId});
 await fetchlist();
 if(response.data.success){
  toast.success(response.data.message);
 }
 else{
  toast.error("Error");
 }
  }

  useEffect(()=>{
    fetchlist();
  },[])

  return (
    <div className='list add flex-col'>
     <p>All Medicine list</p>
     <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      { list.map((item,index)=>{
        return((
          <div key={index} className="list-table-format">
            <img src={`${url}/image/`+item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p onClick={()=>removeMedicine(item._id)} className='cursor'>X</p>
          </div>
        )
      )})}
     </div>
    </div>
  )
}

export default List