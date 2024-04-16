import React, { useState } from 'react';
import '../TruckPage.css'

const AddTruckForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [foodType, setFoodType] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  // const [menu, setMenu] = useState('');

  const handleBusinessNameChange = (e) => {
    setBusinessName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
  };

  const handleMaxCapacityChange = (e) => {
    setMaxCapacity(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the first file selected by the user
    // Process the file (e.g., upload to server, display preview, etc.)
    console.log('Uploaded file:', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="Businesses">
      <h1 className="Title">Input business information here:</h1>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <label htmlFor="businessName">Business Name:</label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={handleBusinessNameChange}
          />
        </div>
        <div className="card">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            /* Add autocomplete attributes here */
          />
        </div>
        <div className="card">
          <label htmlFor="foodType">Food Type:</label>
          <input
            type="text"
            id="foodType"
            value={foodType}
            onChange={handleFoodTypeChange}
          />
        </div>
        <div className="card">
          <label htmlFor="maxCapacity">Max Capacity of Customers:</label>
          <input
            type="text"
            id="maxCapacity"
            value={maxCapacity}
            onChange={handleMaxCapacityChange}
          />
        </div>
        <div className="card">
        <label htmlFor="menu">Menu:</label>
          <input
            type="file"
            // id="menu"
            // value={menu}
            onChange={handleFileUpload}
            />
        </div>
        <div className="card">
        <label htmlFor="license">License:</label>
          <input
            type="file"
            // id="menu"
            // value={menu}
            onChange={handleFileUpload}
            />
        </div>
      </form>
      <button class="button">Submit</button>
    </div>
  );
};

export default AddTruckForm;