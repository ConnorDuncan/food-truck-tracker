import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateInfo.css';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

function UpdateInfo() {
  const { truckId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');

  useEffect(() => {
    const fetchTruckData = async () => {
      const docRef = doc(db, "food-trucks", truckId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTruckBusinessName(data.business_name); // Use the actual field name from Firestore
        setIsOpen(data.open); // Adjusted for boolean 'open' field
        setSelectedFoodType(data.food_type); // Use the actual field name from Firestore
        setTruckCapacity(data.max_capacity); // Use the actual field name from Firestore
      } else {
        console.log('No such truck!');
      }
    };

    fetchTruckData();
  }, [truckId]);

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  const handleSave = async () => {
    // Here you can add logic to update the truck's data in Firestore
    console.log('Save button clicked');
    // Save logic...
  };

  const foodTypes = ['Burgers', 'Chinese', 'Pizza', 'Mexican', 'Sushi', 'Salads', 'Sandwiches', 'Pasta'];

  return (
    <div>
      <h1 className='title'>Update {truckBusinessName}</h1>
      <div className='Description'>Input the updated information, and then click the "save" button</div>

      <div className='cate'>
        <p className='inputlabel'>Name of Your Truck</p>
        <input className='infoinput' value={truckBusinessName} onChange={(e) => setTruckBusinessName(e.target.value)} />
      </div>

      <div className='cate'>
        <p>Select Food Type</p>
        <select value={selectedFoodType} onChange={handleFoodTypeChange}>
          <option value="">Select Food Type</option>
          {foodTypes.map((foodType) => (
            <option key={foodType} value={foodType}>{foodType}</option>
          ))}
        </select>
      </div>

      <div className='cate'>
        <label>
          <p>Is the truck open?</p>
          <input 
            type="checkbox" 
            checked={isOpen} 
            onChange={(e) => setIsOpen(e.target.checked)} 
          />
        </label>
      </div>

      <div className='cate'>
        <p>Max Capacity of Customers</p>
        <input 
          className='infoinput' 
          type="number" 
          value={truckCapacity} 
          onChange={(e) => setTruckCapacity(e.target.value)} 
        />
      </div>
      
      <div className='buttonContainer'>
        <button className='backButton' onClick={() => window.history.back()}>Back</button>
        <button className='saveButton' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default UpdateInfo;
