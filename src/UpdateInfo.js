import { TextField, MenuItem, Checkbox, ListItemText, FormControlLabel } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { GeoPoint } from 'firebase/firestore';
import useFoodTrucks from './useFoodTrucks';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import './loadingSpinner.css';

function UpdateInfo() {
  const { control } = useForm();
  const navigate = useNavigate();
  const { truckId } = useParams();
  const { trucks, loading, updateTruck } = useFoodTrucks();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState([]);
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');
  const [truckIntro, setTruckIntro] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const phonePattern = /^\d{10}$/;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailPattern = /^[A-Za-z0-9.-_]+@[A-Za-z._-]+\.[A-Za-z]+$/;
  const [foodLicenseUrl, setFoodLicenseUrl] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [foodLicense, setFoodLicense] = useState(null);
  const [menu, setMenu] = useState(null);
  const [logo, setLogo] = useState(null);
  const [verified, setVerified] = useState(null);

  const foodTypes = ['Burgers', 'Chinese', 'Mexican', 'Italian', 'Pizza', 'Salad', 'Sandwiches','Grill', 'Sushi','Noodle','Fried', 'Seafood','Indian','Dessert', 'Other'];

  useEffect(() => {
    const truckData = trucks.find(truck => truck.id === truckId);
    if (truckData) {
      setTruckBusinessName(truckData.business_name);
      setIsOpen(truckData.open);
      setSelectedFoodType(Array.isArray(truckData.food_type) ? truckData.food_type : [truckData.food_type]);
      setTruckCapacity(truckData.max_capacity);
      setTruckIntro(truckData.description);
      setPhone(truckData.phone);
      setEmail(truckData.email);
      setFoodLicenseUrl(truckData.license);
      setMenuUrl(truckData.menu);
      setLogoUrl(truckData.logo);
      setVerified(truckData.verified);
    }
  }, [truckId, trucks]);

  const fetchUserLocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          resolve(new GeoPoint(latitude, longitude));
        }, (error) => {
          console.error("Error fetching location", error);
          alert("Unable to fetch location.");
          resolve(null);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
        resolve(null);
      }
    });
  };

  const handleFileChange = async (file, path, setter) => {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${path}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setter(url);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
      return null;
    }
  };

  const handleSave = async () => {
    if (isOpen && !verified) {
      alert("Please wait for the truck to be verified before opening.");
      return null;
    }

    let updates = {};
    if (truckBusinessName) updates.business_name = truckBusinessName;
    if (selectedFoodType.length) updates.food_type = selectedFoodType;
    if (truckCapacity) updates.max_capacity = parseInt(truckCapacity, 10);
    if (truckIntro) updates.truckInfo = truckIntro;
    if (phone) updates.phone = phone;
    if (email) updates.email = email;
    if (!phonePattern.test(phone)) {
      setPhoneError('Invalid phone number. Please enter 10 digits.');
      return;
    } else setPhoneError('');
    if (!emailPattern.test(email)) {
        setEmailError('Invalid email. Please enter a valid email.');
        return;
    } else setEmailError('');
    if (isOpen !== undefined) updates.open = isOpen;
    if (isOpen) {
      const fetchedLocation = await fetchUserLocation();
      if (fetchedLocation) {
        updates.location = fetchedLocation;
      }
    }

    if (foodLicense) {
      updates.license = await handleFileChange(foodLicense, 'licenses', setFoodLicenseUrl);
      updates.verified = false;
      updates.open = false;
      updates.location = null;
    }
    if (menu) updates.menu = await handleFileChange(menu, 'menus', setMenuUrl);
    if (logo) updates.logo = await handleFileChange(logo, 'logos', setLogoUrl);

    try {
      await updateTruck(truckId, updates);
      alert("Truck updated successfully!");
      navigate('/business/list');
    } catch (error) {
      console.error("Error updating truck:", error);
      alert("Failed to update the truck.");
    }
  };

  if (loading) {
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
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              label="Food Type"
              variant="outlined"
              value={selectedFoodType}
              onChange={(e) => {
                const val = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
                setSelectedFoodType(val);
                onChange(val);
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
                  <Checkbox checked={selectedFoodType.includes(foodType)} />
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
          type="number"
          onChange={(e) => setTruckCapacity(e.target.value)}
        />
      </div>

      <div className='cate'>
        <FormControlLabel
          control={<Checkbox checked={isOpen} onChange={() => setIsOpen(!isOpen)} />}
          label="Is the truck open?"
        />
      </div>

      <div className='cate'>
          <TextField
              label="A Brief Description of Your Truck"
              rows={3}
              multiline
              style={{ width: '300px' }}
              variant="outlined"
              value={truckIntro}
              onChange={(e) => setTruckIntro(e.target.value)}
          />
      </div>
      <div className='cate'>
          <TextField
              label="Phone Number"
              rows={1}
              multiline
              style={{ width: '300px' }}
              variant="outlined"
              value={phone}
              onChange={(e) => {setPhone(e.target.value)}}
              error={Boolean(phoneError)}
              helperText={phoneError}
          />
      </div>
      <div className='cate'>
          <TextField
              label="Email"
              rows={1}
              multiline
              style={{ width: '300px' }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
          />
      </div>

      <div className='cate'>
        {foodLicenseUrl && <a href={foodLicenseUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{ marginRight: '30px' }}>Food License</a>}
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
        {menuUrl && <a href={menuUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{ marginRight: '30px' }}>Menu</a>}
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
        {logoUrl && <a href={logoUrl} target="_blank" rel="noopener noreferrer" className='inputlabel' style={{ marginRight: '30px' }}>Logo</a>}
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

      <div className='buttonContainer' style={{ marginBottom: '20px' }}>
        <mdui-button variant="elevated" style={{ width: "150px" }} onClick={() => window.history.back()}>Back</mdui-button>
        <mdui-button variant="tonal" style={{ width: "150px" }} onClick={handleSave}>Save</mdui-button>
      </div>
    </div>
  );
}

export default UpdateInfo;
