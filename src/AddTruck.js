import { TextField, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { db } from './firebase';
import { collection, doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { useAuth } from './components/AuthContext';

function AddTruck() {
    const { control } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFoodType, setSelectedFoodType] = useState([]);
    const [truckCapacity, setTruckCapacity] = useState('');
    const [truckBusinessName, setTruckBusinessName] = useState('');
    const [truckIntro, setTruckIntro] = useState('');
    const [foodLicense, setFoodLicense] = useState(null);
    const [menu, setMenu] = useState(null);
    const [logo, setLogo] = useState(null);
    const { currentUser } = useAuth();

    const foodTypes = ['Burgers', 'Chinese', 'Mexican', 'Pasta', 'Pizza', 'Salads', 'Sandwiches', 'Sushi', 'Other'];


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
      creator: currentUser.uid,
      description: truckIntro
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
      creator: currentUser.uid,
      description: truckIntro
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
    
      if (isLoading || !currentUser) {
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
                <TextField
                    label="Name of Your Truck"
                    style={{ width: '300px' }}
                    variant="outlined"
                    value={truckBusinessName}
                    onChange={(e) => setTruckBusinessName(e.target.value)}
                />
            </div>
            <div className='cate'>
                <Controller
                    control={control}
                    name="selectedFoodType"
                    defaultValue={selectedFoodType}
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
            <div className='cate'>
            <TextField
                label="Max Capacity of Customers"
                style={{ width: '300px' }}
                variant="outlined"
                value={truckCapacity}
                onChange={(e) => setTruckCapacity(e.target.value.replace(/\D/, ''))} // Strip non-numeric values
                inputMode="numeric" // Mobile keyboards
                pattern="\d*" // Restrict to digits only
            />
            </div>
            <div className='cate'>
                <TextField
                    label="A Brief Intro to Your Truck"
                    rows={3}
                    multiline
                    style={{ width: '300px' }}
                    variant="outlined"
                    value={truckIntro}
                    onChange={(e) => setTruckIntro(e.target.value)}
                />
            </div>

            <div className='cate'>
                <p className='inputlabel'>Food License</p>
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

            <div className='cate'>
                <p className='inputlabel'>Menu</p>
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

            <div className='cate'>
                <p className='inputlabel'>Logo</p>
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
                <mdui-button variant="elevated" style={{ width: "150px" }} onClick={() => window.history.back()}>Back</mdui-button>
                <mdui-button variant="tonal" style={{ width: "150px" }} onClick={handleSave}>Save</mdui-button>
            </div>
        </div>
    );
}

export default AddTruck;
