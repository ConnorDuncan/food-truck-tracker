import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateInfo.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import './loadingSpinner.css';
import 'mdui/components/card.js';
import { useAuth } from './components/AuthContext';

function UpdateInfo() {
  const navigate = useNavigate();
  const { truckId } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [truckCapacity, setTruckCapacity] = useState('');
  const [truckBusinessName, setTruckBusinessName] = useState('');
  const [foodLicense, setFoodLicense] = useState(null);
  const [menu, setMenu] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchTruckData = async () => {
      const docRef = doc(db, "food-trucks", truckId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTruckBusinessName(data.business_name);
        setIsOpen(data.open);
        setSelectedFoodType(data.food_type);
        setTruckCapacity(data.max_capacity.toString());
        setIsLoading(false);
      } else {
        console.log('No such truck!');
      }
    };
    fetchTruckData();
  }, [truckId]);

  const handleFoodLicenseChange = (event) => {
    setFoodLicense(event.target.files[0]); // Capture the first file
};
const handleMenuChange = (event) => {
  setMenu(event.target.files[0]); // Capture the first file
};
const handleLogoChange = (event) => {
setLogo(event.target.files[0]); // Capture the first file
};

  const handleFileChange = async (file, path) => {
    if (!file) {
      return null;
    }
    const storageRef = ref(storage, `uploads/${path}/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error("Error uploading file: ", error);
      return null;
    }
  };

  const handleFoodTypeChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updates = {};
    if (truckBusinessName) updates.business_name = truckBusinessName;
    if (selectedFoodType) updates.food_type = selectedFoodType;
    if (truckCapacity) updates.max_capacity = parseInt(truckCapacity);
    if (isOpen !== undefined) updates.open = isOpen;

    const licenseUrl = foodLicense ? await handleFileChange(foodLicense, 'licenses') : undefined;
    const menuUrl = menu ? await handleFileChange(menu, 'menus') : undefined;
    const logoUrl = logo ? await handleFileChange(logo, 'logos') : undefined;

    if (licenseUrl) updates.license = licenseUrl;
    if (menuUrl) updates.menu = menuUrl;
    if (logoUrl) updates.logo = logoUrl;

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
      <div className='Description'>Input the updated information, and then click the "save" button</div>
      <div className='Description'>Only upload a single file for each field</div>
      <div className='Description'>If you don't want to update a field, leave it blank</div>


      <div className='cate'>
        <p className='inputlabel'>Name of Your Truck</p>
        <input className='infoinput' value={truckBusinessName} onChange={(e) => setTruckBusinessName(e.target.value)} />
      </div>
      <div className='cate'>
        <p className='inputlabel'>Select Food Type</p>
        <select value={selectedFoodType} onChange={handleFoodTypeChange}>
          <option value="">Select Food Type</option>
          {['Burgers', 'Chinese', 'Pizza', 'Mexican', 'Sushi', 'Salads', 'Sandwiches', 'Pasta'].map((foodType) => (
            <option key={foodType} value={foodType}>{foodType}</option>
          ))}
        </select>
      </div>
      <div className='cate'>
        <p className='inputlabel'>Max Capacity of Customers</p>
        <input className='infoinput' type="number" value={truckCapacity} onChange={(e) => setTruckCapacity(e.target.value)} />
      </div>
      <div className='cate'>
        <p className='inputlabel'>Is the truck open?</p>
        <input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)} />
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
        <button className='saveButton' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default UpdateInfo;
