import React, { useState } from 'react';
import '../TruckPage.css'
// import ref

// function submitForm() {
//   var businessName = document.getElementById("businessName").value;
//   var location = document.getElementById("location").value;
//   var foodType = document.getElementById("foodType").value;
//   var maxCapacity = document.getElementById("maxCapacity").value;
//   // var businessName = document.getElementById("businessName").value;
//   // var businessName = document.getElementById("businessName").value;
// }


// 3 steps for having state w/ react:
// 1)  import useState hook from react
// 2) define state variable and update f'n with the useState hook
// 3) define a f'n that changes state variable with the update f'n

const AddTruckForm = () => {
  //useState hook to declare a state variable inside your component (returns an array with state value and variable update handling f'n)
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [foodType, setFoodType] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [menu, setMenu] = useState(null);
  const [license, setLicense] = useState(null);


  
  // define functions that update state variable with the f'n inside the useState hook
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
  const handleMenuChange = (e) => {
    const file = e.target.files[0];
    setMenu(file);
  };
  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    setLicense(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  // connect to Firebase DB 
  function createDoc(newDataObj) {
    console.log("MADE!");
    ref.doc().set(newDataObj).catch((err) => {
      alert(err)
      console.error(err);
    })
    
  }

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
            id="menu"
            value={menu}
            onClick={handleMenuChange}
            />
        </div>
        <div className="card">
        <label htmlFor="license">License:</label>
          <input
            type="file"
            id="license"
            value={license}
            onClick={handleLicenseChange}
            />
        </div>
      </form>
      <button 
      class="button"
      onClick={()=>{createDoc({businessName, location, foodType, maxCapacity, menu, license})}}
      >
        Submit
      </button>
    </div>
  );
};

export default AddTruckForm;