import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';  
import { storage } from './firebase';
import './loadingSpinner.css';
//import MDUI icon
import 'mdui/components/card.js';
function UpdateInfo() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');
  const [foodLicense, setFoodLicense] = useState(null);
  const [menu, setMenu] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleFoodLicenseChange = (event) => {
      setFoodLicense(event.target.files[0]); // Capture the first file
  };
  const handleMenuChange = (event) => {
    setMenu(event.target.files[0]); // Capture the first file
};
const handleLogoChange = (event) => {
  setLogo(event.target.files[0]); // Capture the first file
};

  const handleSubmitFoodLicense = async () => {
    if (!foodLicense) {
        alert('No file selected for food license!');
        return;
    }

    const storageRef = ref(storage, `uploads/${foodLicense.name}`);
    try {
        const snapshot = await uploadBytes(storageRef, foodLicense);
        const url = await getDownloadURL(snapshot.ref);
        console.log('File uploaded successfully:', url);
        return url;
    } catch (error) {
        console.error("Error uploading file: ", error);
        return null;
    }
};
const handleSubmitMenu = async () => {
  if (!menu) {
      alert('No file selected!');
      return;
  }

  const storageRef = ref(storage, `uploads/${menu.name}`);
  try {
      const snapshot = await uploadBytes(storageRef, menu);
      const url = await getDownloadURL(snapshot.ref);
      console.log('File uploaded successfully:', url);
      return url;
  } catch (error) {
      console.error("Error uploading file: ", error);
      return null;
  }
};

const handleSubmitLogo = async () => {
  if (!logo) {
      alert('No file selected!');
      return;
  }

  const storageRef = ref(storage, `uploads/${logo.name}`);
  try {
      const snapshot = await uploadBytes(storageRef, logo);
      const url = await getDownloadURL(snapshot.ref);
      console.log('File uploaded successfully:', url);
      return url;
  } catch (error) {
      console.error("Error uploading file: ", error);
      return null;
  }
};


  useEffect(() => {
    
  }, []);

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };


  const handleSave = async () => {
    console.log('Save button clicked');
    setIsLoading(true);
    // Implement save logic here...
    // Make sure all fields are inputted
    // use the handleSubmit function to submit the photos.
    if(truckBusinessName === ''){
      alert("Please input business name");
      setIsLoading(false);
      return;
    }
    else if(selectedFoodType === ''){
      alert("Please select food type");
      setIsLoading(false);
      return;
    }
    else if(truckCapacity === ''){
      alert("Please input max capacity");
      setIsLoading(false);
      return;
    }
    else if(!foodLicense){
      alert("No file selected for food license");
      setIsLoading(false);
      return;
    }
    else if(!menu){
      alert("No file selected for menu");
      setIsLoading(false);
      return;
    }
    else if(!logo){
      alert("No file selected for logo");
      setIsLoading(false);
      return;
    }
    else{ // if all fields are inputted, upload/update the information to firebase
      await handleSubmitFoodLicense();
      await handleSubmitMenu();
      await handleSubmitLogo();
      setIsLoading(false);
      navigate('/business/list');
    }
  };

  const foodTypes = ['Burgers', 'Chinese', 'Pizza', 'Mexican', 'Sushi', 'Salads', 'Sandwiches', 'Pasta'];

  if (isLoading) {
    return (
      <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner"></div>
            <p className="loading-text">Loading, please do not close the page, refresh the page, or click the back button.</p>
        </div>
    );
  }

  return (
    <div>
  <h1 className='title'>Create Your Truck</h1>
  <div className='Description'>Input the information, and then click the "create" button</div>

  <div className='cate'>
    <p className='inputlabel'>Name of Your Truck</p>
    <input className='infoinput' value={truckBusinessName} onChange={(e) => setTruckBusinessName(e.target.value)} />
  </div>

  <div className='cate'>
    <p className='inputlabel'>Select Food Type</p>
    <select value={selectedFoodType} onChange={handleFoodTypeChange}>
      <option value="">Select Food Type</option>
      {foodTypes.map((foodType) => (
        <option key={foodType} value={foodType}>{foodType}</option>
      ))}
    </select>
  </div>

  <div className='cate'>
    <p className='inputlabel'>Max Capacity of Customers</p>
    <input 
      className='infoinput' 
      type="number" 
      value={truckCapacity} 
      onChange={(e) => setTruckCapacity(e.target.value)} 
    />
  </div>


  <div className='cate'>
    <p className='inputlabel'>Food License</p>
    <input type="file" onChange={handleFoodLicenseChange} />
  </div>

  <div className='cate'>
    <p className='inputlabel'>Menu</p>
    <input type="file" onChange={handleMenuChange} />
  </div>

  <div className='cate'>
    <p className='inputlabel'>Logo</p>
    <input type="file" onChange={handleLogoChange} />
  </div>

  

  <div className='buttonContainer'>
    <button className='backButton' onClick={() => window.history.back()}>Back</button>
    <button className='saveButton' onClick={handleSave}>Create</button>
  </div>
</div>

  );
}

export default UpdateInfo;
