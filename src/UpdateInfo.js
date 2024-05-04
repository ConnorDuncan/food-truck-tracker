import { TextField, MenuItem, Checkbox, ListItemText, FormControlLabel } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { doc, getDoc, updateDoc, GeoPoint } from 'firebase/firestore';
import { db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import './loadingSpinner.css';
import 'mdui/components/card.js';
import { useAuth } from './components/AuthContext';
import 'mdui/components/checkbox.js';



function UpdateInfo() {
  const navigate = useNavigate();
  const { truckId } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState([]);
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');
  const [foodLicenseUrl, setFoodLicenseUrl] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [foodLicense, setFoodLicense] = useState(null);
  const [menu, setMenu] = useState(null);
  const [logo, setLogo] = useState(null);
  const [location, setLocation] = useState(null);
  const [verified, setVerified] = useState(null);
  const [counter, setCounter] = useState(1);
  const { control } = useForm();


  const foodTypes = ['Burgers', 'Chinese', 'Mexican', 'Pasta', 'Pizza', 'Salads', 'Sandwiches', 'Sushi', 'Other'];

  useEffect(() => {
    const fetchTruckData = async () => {
      const docRef = doc(db, "food-trucks", truckId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTruckBusinessName(data.business_name);
        setIsOpen(data.open);
        setSelectedFoodType(data.food_type);
        setTruckCapacity(data.max_capacity);
        setFoodLicenseUrl(data.license);
        setMenuUrl(data.menu);
        setLogoUrl(data.logo);
        setVerified(data.verified);
        setIsLoading(false);
      } else {
        console.log('No such truck!');
      }
    };
    fetchTruckData();
  }, [truckId]);


  const fetchUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve(new GeoPoint(latitude, longitude)); // Resolve the GeoPoint
        }, (error) => {
          console.error("Error fetching location", error);
          alert("Unable to fetch location.");
          resolve(null); // Resolve null if there's an error
        });
      } else {
        alert("Geolocation is not supported by this browser.");
        resolve(null);
      }
    });
  };

  function handleCheckboxChange(isChecked) {
      setIsOpen(!isOpen);
    console.log(isChecked);
}



  const handleFileChange = async (file, path, setter) => {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${path}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setter(url);
      return url;
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Failed to upload file");
      return null;
    }
  };
  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };
  const handleSave = async () => {
    setIsLoading(true);
    if(isOpen && !verified){
      alert("Please wait for the truck to be verified before opening.");
      setIsLoading(false);
      return null;
    }
    let updates = {};

    if (truckBusinessName) updates.business_name = truckBusinessName;
    if (selectedFoodType) updates.food_type = selectedFoodType;
    if (truckCapacity) updates.max_capacity = parseInt(truckCapacity, 10);
    if (isOpen !== undefined) updates.open = isOpen;
    if (isOpen) {
      const fetchedLocation = await fetchUserLocation();
      if (fetchedLocation) {
        updates.location = fetchedLocation;
      }
    }

    if (foodLicense) {
      updates.license = await handleFileChange(foodLicense, 'licenses', setFoodLicenseUrl);
    }
    if (menu) {
      updates.menu = await handleFileChange(menu, 'menus', setMenuUrl);
    }
    if (logo) {
      updates.logo = await handleFileChange(logo, 'logos', setLogoUrl);
    }

    try {
      const truckRef = doc(db, "food-trucks", truckId);
      await updateDoc(truckRef, updates);

      const userTruckRef = doc(db, "userToTrucks", currentUser.uid, "listOfTrucks", truckId);
      await updateDoc(userTruckRef, updates);

      alert("Truck updated successfully!");
      navigate('/business/list');
    } catch (error) {
      console.error("Error updating truck: ", error);
      alert("Failed to update the truck.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading, please do not close the page, refresh the page, or click the back button.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className='title'>Update {truckBusinessName}</h1>
      <div className='Description'>Update the desired fields, and then click the "save" button</div>
      <div className='Description'>Only upload a single file for each field</div>
      <div className='Description'>If you open your truck, it will be marked "open" at your current location!</div>

      {/* <div className='cate'>
        <p className='inputlabel'>Name of Your Truck</p>
        <input className='infoinput' value={truckBusinessName} onChange={(e) => setTruckBusinessName(e.target.value)} />
      </div> */}

      <div className='cate'>
        <TextField
          label="Name of Your Truck"
          style={{ width: '300px' }}
          variant="outlined"
          value={truckBusinessName}
          onChange={(e) => setTruckBusinessName(e.target.value)}
        />
      </div>

{/* 
      <div className='cate'>
        <p className='inputlabel'>Select Food Type</p>
        <select value={selectedFoodType} onChange={handleFoodTypeChange}>
          <option value="">Select Food Type</option>
          {['Burgers', 'Chinese', 'Pizza', 'Mexican', 'Sushi', 'Salads', 'Sandwiches', 'Pasta'].map((foodType) => (
            <option key={foodType} value={foodType}>{foodType}</option>
          ))}
        </select>
      </div> */}

      <div className='cate'>
        <Controller
            control={control}
            name="selectedFoodType"
            
            value={selectedFoodType}
             render={({ field: { onChange, value = [] } }) => (
                <TextField
                    select
                    label="Food Type"
                    variant="outlined"
                    value={value}
                    onChange={(e) => {
                        setSelectedFoodType(e.target.value);
                        onChange(e.target.value);
                    }}
                    style={{ width: '300px' }}
                    SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.join(", "),
                    MenuProps: {
                    getContentAnchorEl: null,
                    anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                    },
                    transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                    }
                    }
                    }}
                >
                    {foodTypes.map((foodType) => (
                        <MenuItem key={foodType} value={foodType}>
                             <Checkbox checked={value.includes(foodType)} />
                            <ListItemText primary={foodType} />
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    </div>

      {/* <div className='cate'>
        <p className='inputlabel'>Max Capacity of Customers</p>
        <input className='infoinput' type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} />
      </div> */}

      <div className='cate'>
        <TextField
          label="Max Capacity of Customers"
          style={{ width: '300px' }}
          variant="outlined"
          value={truckCapacity}
          type="number"
          onChange={(e) => setTruckCapacity(e.target.value)}
        />
      </div>

      <div className='cate'>
        <FormControlLabel
          control={<Checkbox checked={isOpen} onChange={handleCheckboxChange} />}
          label="Is the truck open?"
        />
      </div>





      {/* <div className='cate'>
        {foodLicenseUrl && <a href={foodLicenseUrl} target="_blank" rel="noopener noreferrer" className='inputlabel'>Food License</a>}
        <input className='fileUpload' type="file" onChange={(e) => setFoodLicense(e.target.files[0])} />
      </div> */}

      <div className='cate'>
                {/* <p className='inputlabel'>Food License</p> */}
                {foodLicenseUrl && <a href={foodLicenseUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{marginRight:'30px'}}>Food License</a>}
                <input
                    type="file"
                    onChange={(e) => setFoodLicense(e.target.files[0])}
                    id="foodLicenseInput"
                    style={{ display: 'none' }}
                />
                <mdui-button
                    variant="outlined"
                    component="label"
                    onClick={() => document.getElementById('foodLicenseInput').click()}
                >
                    {foodLicense ? foodLicense.name : "No file chosen"}
                </mdui-button>
            </div>

      {/* <div className='cate'>
        {menuUrl && <a href={menuUrl} target="_blank" rel="noopener noreferrer" className='inputlabel'>Menu</a>}
        <input className='fileUpload' type="file" onChange={(e) => setMenu(e.target.files[0])} />
      </div> */}

      <div className='cate'>
                {/* <p className='inputlabel'>Menu</p> */}
                {menuUrl && <a href={menuUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{marginRight:'30px'}}>Menu</a>}
                <input
                    type="file"
                    onChange={(e) => setMenu(e.target.files[0])}
                    id="menuInput"
                    style={{ display: 'none' }}
                />
                <mdui-button
                    variant="outlined"
                    component="label"
                    onClick={() => document.getElementById('menuInput').click()}
                >
                    {menu ? menu.name : "No file chosen"}
                </mdui-button>
            </div>

      {/* <div className='cate'>
        {logoUrl && <a href={logoUrl} target="_blank" rel="noopener noreferrer" className='inputlabel'>Logo</a>}
        <input className='fileUpload' type="file" onChange={(e) => setLogo(e.target.files[0])} />
      </div> */}

      <div className='cate'>
                {/* <p className='inputlabel'>Logo</p> */}
                {logoUrl && <a href={logoUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{marginRight:'30px'}}>Logo</a>}
                <input
                    type="file"
                    onChange={(e) => setLogo(e.target.files[0])}
                    id="logoInput"
                    style={{ display: 'none' }}
                />
                <mdui-button
                    variant="outlined"
                    component="label"
                    onClick={() => document.getElementById('logoInput').click()}
                >
                    {logo ? logo.name : "No file chosen"}
                </mdui-button>
            </div>

      <div className='buttonContainer'>
        {/* <button className='backButton' onClick={() => window.history.back()}>Back</button>
        <button className='saveButton' onClick={handleSave}>Save</button> */}

        <mdui-button variant="elevated" style={{ width: "150px" }} onClick={() => window.history.back()}>Back</mdui-button>
        <mdui-button variant="tonal" style={{ width: "150px" }} onClick={handleSave}>Save</mdui-button>
      </div>
    </div>
  );
}

export default UpdateInfo;
