import { TextField, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
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
    const [foodLicense, setFoodLicense] = useState(null);
    const [menu, setMenu] = useState(null);
    const [logo, setLogo] = useState(null);
    const { currentUser } = useAuth();

    const foodTypes = ['Burgers', 'Chinese', 'Mexican', 'Pasta', 'Pizza', 'Salads', 'Sandwiches', 'Sushi', 'Other'];

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
            await createTruck(truckData);
            setIsLoading(false);
            navigate('/business/list');
        } catch (error) {
            alert("Error creating truck: ", error);
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
                    value={truckCapacity}
                    onChange={(e) => setTruckCapacity(e.target.value)}
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
