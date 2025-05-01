import React, { useState } from 'react'; // Import useState hook
import './Home.css';
import Header from '../../components/Header/Header';
import Category from '../../components/Category/Category';
import MedicineDisplay from '../../components/MedicineDisplay/MedicineDisplay';

const Home = () => {
  const [category, setCategory] = useState("All"); // Corrected useState

  return (
    <div>
      <Header />
      <div id="category-section"> {/* Added id for Category section */}
        <Category category={category} setCategory={setCategory} />
        <MedicineDisplay category={category} />
      </div>
      <div id="contact-section"> {/* Added id for Contact section */}
      </div>
    </div>
  );
};

export default Home;
