import React, { useContext} from 'react';
import './MedicineDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import MedicineItem from '../MedicineItem/MedicineItem';

const MedicineDisplay = ({ category }) => {
    const { med_list } = useContext(StoreContext);

    return (
        <div className='medicine-display' id='medicine-display'>
            <h2>Best Medicine near you</h2>
            <div className="medicine-display-list">
                {med_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <div key={index} className="product-item">
                                <MedicineItem 
                                    id={item._id} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    image={item.image} 
                                />
                              
                            </div>
                        );
                    }
                    return null;
                })}

               
            </div>
        </div>
    );
};

export default MedicineDisplay;