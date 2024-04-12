import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateInfo.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import ClockIcon from './ClockIcon';

function UpdateInfo(){
  const { truckName } = useParams();

  const [openTime, setOpenTime] = useState(null); // State to store selected open time
  const [closeTime, setCloseTime] = useState(null); // State to store selected close time
  const [selectedFoodType, setSelectedFoodType] = useState(''); // State to store selected food type


  const handleOpenTimeChange = (time) => {
    setOpenTime(time);
  };

  const handleCloseTimeChange = (time) => {
    setCloseTime(time);
  };

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  const foodTypes = ['Burger', 'Chinese Food', 'Pizza', 'Taco', 'Sushi', 'Salad', 'Sandwich', 'Pasta'];

  const handleSave = () => {
    if (openTime && closeTime) {
      alert('Selected open time:', openTime);
      console.log('Selected close time:', closeTime);
      // Add logic here to save the selected times to backend or perform other actions
    } else {
      console.log('Please select both open and close times');
      // Add error handling if either open or close time is not selected
    }
  };

  return (
    <div>
      <h1 class = 'title'>{truckName}</h1>
      <div class = 'Description'>Input the updated information, and then click the "save" button</div>
      

      <div class='cate'>
        <p classname = 'inputlabel'>Name of Your Truck</p>
        <input classname = 'infoinput' placeholder={truckName}/>
      </div>
      
      <div className='cate'>
        <p>Select Food Type</p>
        <select value={selectedFoodType} onChange={handleFoodTypeChange}>
          <option value="">Select Food Type</option> {/*should be the previously saved food type*/}
          {foodTypes.map((foodType) => (
            <option key={foodType} value={foodType}>
              {foodType}
            </option>
          ))}
        </select>
      </div>
      
      <div className='cate'>
        <div className='clockIcon'>
          <ClockIcon/>
        </div>
        
        <p>Open Time</p>
        <DatePicker
          selected={openTime}
          onChange={handleOpenTimeChange}
          showTimeSelect
          showTimeSelectOnly 
          timeIntervals={15}
          dateFormat="h:mm aa"
          placeholderText="Select Time" //should be the previously saved open time*/
        />
      </div>

      <div className='cate'>
        <div className='clockIcon'>
          <ClockIcon/>
        </div>
        <p>Close Time</p>
        <DatePicker
          selected={closeTime}
          onChange={handleCloseTimeChange}
          showTimeSelect
          showTimeSelectOnly 
          timeIntervals={15}
          dateFormat="h:mm aa" 
          placeholderText="Select Time" //should be the previously saved close time
        />
      </div>

      <div className='cate'>
        <p>Max Capacity of Customers</p>
        <input classname = 'infoinput' placeholder="10"/> {/*the placeholder should be the previously saved number*/}
      </div>
      
      
      <div className='buttonContainer'>

        <div className='buttonContainer'>
          <button className='backButton' onClick={() => window.history.back()}>
             Back
          </button>
        </div>

        <div className='buttonContainer'>
          <button className='saveButton' onClick={handleSave}>Save</button>
        </div>
      </div>

      

    </div>
  );
};

export default UpdateInfo;