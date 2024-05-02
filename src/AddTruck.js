import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';  
import { storage } from './firebase';
import './loadingSpinner.css';
import {useAuth} from './components/AuthContext';

//import MDUI icon
import 'mdui/components/card.js';
import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/chip.js';
import 'mdui/components/button.js';
import 'mdui/components/linear-progress.js';

function UpdateInfo() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');
  const [foodLicense, setFoodLicense] = useState(null);
  const [menu, setMenu] = useState(null);
  const [logo, setLogo] = useState(null);
  const truckBusinessNameRef = useRef(null);
  const truckCapacityRef = useRef(null);
  const selectedFoodTypeRef = useRef(null);
  const { currentUser } = useAuth();

  const handleTruckBusinessName = (event) => {
    const newValue = event.target.value;
    console.log("Input value changed to:", newValue);
    setTruckBusinessName(newValue);
  };

  const handleTruckCapacity = (event) => {
    const newValue = event.target.value;
    console.log("Input value changed to:", newValue);
    setTruckCapacity(newValue);
  };

  const handleFoodTypeChange = (event) => {
    //const selectedFoodType = Array.from(event.target.selectedFoodType).map((option) => option.value);
    const selectedFoodType = event.target.value;
    console.log("foodtype change:", selectedFoodType);
    setSelectedFoodType(selectedFoodType[0]);
  };
  
  useEffect(() => {
    // Attach event listener after component mounts
    const selected = selectedFoodTypeRef.current;
    if (selected) {
      selected.addEventListener('change', handleFoodTypeChange); 

      return () => {
        selected.removeEventListener('change', handleFoodTypeChange);
      };
    }
  }, []);

  useEffect(() => {
    // Attach event listener after component mounts
    const textfield = truckBusinessNameRef.current;
    if (textfield) {
      textfield.addEventListener('change', handleTruckBusinessName); 

      return () => {
        textfield.removeEventListener('change', handleTruckBusinessName);
      };
    }
  }, []);

  useEffect(() => {
    // Attach event listener after component mounts
    const textfield = truckCapacityRef.current;
    if (textfield) {
      textfield.addEventListener('change', handleTruckCapacity); 

      return () => {
        textfield.removeEventListener('change', handleTruckCapacity);
      };
    }
  }, []);

  const handleLicenseClick = () => {
    document.getElementById('foodLicenseInput').click();
  };
  
  const handleManuClick = () => {
    document.getElementById('ManuInput').click();
  };

  const handleLogoClick = () => {
    document.getElementById('LogoInput').click();
  };

  const handleFoodLicenseChange = (event) => {
    setFoodLicense(event.target.files[0]); // Capture the first file
  }
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

  


  const handleSave = async () => {
    console.log('Save button clicked');
    setIsLoading(true);
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
      try{
        const newTruckRef = doc(collection(db, "food-trucks"));
        const truckId = newTruckRef.id;

        console.log("Creating new document reference: ",truckId);
      const foodLicenseURL = await handleSubmitFoodLicense();
      const menuURL = await handleSubmitMenu();
      const logoURL = await handleSubmitLogo();
      const max_capacity_int = parseInt(truckCapacity);

      if (!foodLicenseURL || !menuURL || !logoURL) {
        alert('Failed to upload files.');
        setIsLoading(false);
        return;
      }
      if (isNaN(max_capacity_int)) {
        alert("Max capacity must be a number");
        setIsLoading(false);
        return;
      }


      await setDoc(newTruckRef, {
        business_name: truckBusinessName,
        food_type: selectedFoodType,
        max_capacity: max_capacity_int,
        license: foodLicenseURL,
        menu: menuURL,
        logo: logoURL,
        open: false,
        verified: false,
        creator: currentUser.uid
      });
      const userTrucksRef = collection(db, "userToTrucks", currentUser.uid, "listOfTrucks");
      const userTruckRef = doc(userTrucksRef, truckId);
        
  
        // Check if the user document exists
        await setDoc(userTruckRef, {
          business_name: truckBusinessName,
          food_type: selectedFoodType,
          max_capacity: max_capacity_int,
          license: foodLicenseURL,
          menu: menuURL,
          logo: logoURL,
          open: false,
          verified: false,
          creator: currentUser.uid
        });
  
        const userRef = doc(db, "userToTrucks", currentUser.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists() && userSnap.data().numTrucks !== undefined) {
          await updateDoc(userRef, { numTrucks: userSnap.data().numTrucks + 1 });
        } else {
          await setDoc(userRef, { numTrucks: 1 });
        }
  
        console.log('New truck added with ID:', newTruckRef.id);
      console.log('Truck data uploaded successfully!');
      setIsLoading(false);
      navigate('/business/list');
      }
      catch(error){
        alert("Error uploading: ", error);
      }
      setIsLoading(false);
    }
  };

  const foodTypes = ['Burgers', 'Chinese', 'Pizza', 'Mexican', 'Sushi', 'Salads', 'Sandwiches', 'Pasta'];

  if (isLoading) {
    return (
      <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* <div className="spinner"></div> */}
            <mdui-linear-progress></mdui-linear-progress>
            <p className="loading-text">Loading, please do not close the page, refresh the page, or click the back button.</p>
        </div>
    );
  }

  return (
    <div>
  <h1 className='title'>Create Your Truck</h1>
  <div className='Description'>Input the information, and then click the "create" button</div>

  <div className='cate'>
    <mdui-text-field label="Name of Your Truck" style = {{width: '20%'}} variant="outlined" value={truckBusinessName} ref={truckBusinessNameRef} />
  </div>

  <div className='cate'>
    {/* <p className='inputlabel'>Select Food Type</p>
    <select value={selectedFoodType} onChange={handleFoodTypeChange}>
      <option value="">Select Food Type</option>
      {foodTypes.map((foodType) => (
        <option key={foodType} value={foodType}>{foodType}</option>
      ))}
    </select> */}
    <mdui-select multiple value={selectedFoodType} label="Select Your Food Types" style={{width: "20%"}} class="example-multiple" ref={selectedFoodTypeRef}>
      {foodTypes.map((foodType) => (
        <mdui-menu-item key={foodType} value={foodType}>{foodType}</mdui-menu-item>
      ))}
      
    </mdui-select>
  </div>

  <div className='cate'>
    <mdui-text-field label="Max Capacity of Customers" style = {{width: '20%'}} variant="outlined" value={truckCapacity} ref={truckCapacityRef} ></mdui-text-field>
    
  </div>

  

  <div className='cate'>
    <p className='inputlabel'>Food License</p>
    <input type="file" onChange={handleFoodLicenseChange} id="foodLicenseInput" style={{ display: 'none' }}/>

    <mdui-button variant="outlined" component="label" onClick={handleLicenseClick}>
      {foodLicense ? foodLicense.name : "No file chosen"}
    </mdui-button>

  </div>

  <div className='cate'>
    <p className='inputlabel'>Menu</p>
    <input type="file" onChange={handleMenuChange} id="ManuInput" style={{ display: 'none' }}/>
    <mdui-button variant="outlined" component="label" onClick={handleManuClick}>
      {menu ? menu.name : "No file chosen"}
    </mdui-button>
  </div>

  <div className='cate'>
    <p className='inputlabel'>Logo</p>
    <input type="file" onChange={handleLogoChange} id="LogoInput" style={{ display: 'none' }}/>

    <mdui-button variant="outlined" component="label" onClick={handleLogoClick}>
      {logo ? logo.name : "No file chosen"}
    </mdui-button>
  </div>

  

  <div className='buttonContainer'>
    {/* <button className='backButton' >Back</button>
    <button className='saveButton' onClick={handleSave}>Create</button> */}
    <mdui-button variant="elevated" style={{width: "10%"}} onClick={() => window.history.back()}>Back</mdui-button>
    <mdui-button variant="tonal" style={{width: "10%"}} onClick={handleSave}>Save</mdui-button>

  </div>
</div>

  );
}

export default UpdateInfo;
