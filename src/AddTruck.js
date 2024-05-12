import { TextField, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import './loadingSpinner.css';
import axios from 'axios';
import 'mdui/components/card.js';
import { useAuth } from './components/AuthContext';
import useFoodTrucks from './useFoodTrucks';

function AddTruck() {
    const { control } = useForm();
    const navigate = useNavigate();
    const { createTruck } = useFoodTrucks();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFoodType, setSelectedFoodType] = useState([]);
    const [truckCapacity, setTruckCapacity] = useState('');
    const [truckBusinessName, setTruckBusinessName] = useState('');
    const [truckIntro, setTruckIntro] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const phonePattern = /^\d{10}$/;
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailPattern = /^[A-Za-z0-9.-_]+@[A-Za-z0-9-_]+\.[A-Za-z]+$/;
    const [foodLicense, setFoodLicense] = useState(null);
    const [menu, setMenu] = useState(null);
    const [logo, setLogo] = useState(null);
    const { currentUser } = useAuth();

    const foodTypes = ['Burgers', 'Chinese', 'Mexican', 'Italian', 'Pizza', 'Salad', 'Sandwiches','Grill', 'Sushi','Noodle','Fried', 'Seafood','Indian','Dessert', 'Other'];

    const handleFileUpload = async (file, path) => {
        if (!file) return null;
        const storageRef = ref(storage, `uploads/${path}/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Error uploading file: ", error);
            return null;
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        if (!truckBusinessName) {
            alert("Please input business name");
            setIsLoading(false);
            return;
        }
        if (!selectedFoodType.length) {
            alert("Please select food type");
            setIsLoading(false);
            return;
        }
        if (!truckCapacity) {
            alert("Please input max capacity");
            setIsLoading(false);
            return;
        }
        if (!phone) {
            alert("Please input a phone number");
            setIsLoading(false);
            return;
        }
        if (!phonePattern.test(phone)) {
            setIsLoading(false);
            setPhoneError('Invalid phone number. Please enter 10 digits.');
            return;
        } else setPhoneError('');
        if (!email) {
            alert("Please input an email");
            setIsLoading(false);
            return;
        }
        if (!emailPattern.test(email)) {
            setEmailError('Invalid email. Please enter a valid email.');
            setIsLoading(false);
            return;
        } else setEmailError('');

        const foodLicenseURL = await handleFileUpload(foodLicense, 'licenses');
        const menuURL = await handleFileUpload(menu, 'menus');
        const logoURL = await handleFileUpload(logo, 'logos');

        if (!foodLicenseURL || !menuURL || !logoURL) {
            alert('Failed to upload files.');
            setIsLoading(false);
            return;
        }

        const truckData = {
            business_name: truckBusinessName,
            food_type: selectedFoodType,
            max_capacity: parseInt(truckCapacity),
            phone: '(' + phone.slice(0, 3) + ')'
                       + phone.slice(3, 6) + '-' 
                       + phone.slice(6, 10),
            email: email,
            license: foodLicenseURL,
            menu: menuURL,
            logo: logoURL,
            open: false,
            verified: false,
            creator: currentUser.uid,
            description: truckIntro,
            createTime: new Date()
        };

        try {
            const truckId = await createTruck(truckData);
            const response = await axios.post('http://localhost:5001/api/user/email', {
                "truckId": truckId,
                "businessName": truckBusinessName,
                "selectedFoodType": selectedFoodType,
                "maxCapacity": parseInt(truckCapacity),
                "phone": '(' + phone.slice(0, 3) + ')'
                             + phone.slice(3, 6) + '-' 
                             + phone.slice(6, 10),
                "email": email,
                "foodLicenseURL": foodLicenseURL,
                "menuURL": menuURL,
                "logoURL": logoURL        
                });
                console.log(response.data);
            setIsLoading(false);
            navigate('/business/list');
        } catch (error) {
            alert("Error creating truck: ", error);
            setIsLoading(false);
        }
    };

    const handleCapacityInput = (e) => {
        // Ensures only positive integers are allowed
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        setTruckCapacity(e.target.value);
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
                    type="number"
                    value={truckCapacity}
                    onInput={handleCapacityInput}
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
            <div className='buttonContainer' style={{ marginBottom: '20px' }}>
                <mdui-button variant="elevated" style={{ width: "150px" }} onClick={() => window.history.back()}>Back</mdui-button>
                <mdui-button variant="tonal" style={{ width: "150px" }} onClick={handleSave}>Save</mdui-button>
            </div>
        </div>
    );
}

export default AddTruck;
