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
        setTruckCapacity(data.max_capacity);
        setIsLoading(false);
      } else {
        console.log('No such truck!');
      }
    };
    fetchTruckData();
  }, [truckId]);

  const handleFileChange = async (file, path) => {
    if (!file) {
      return;
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
  const handleFoodLicenseChange = (event) => {
    setFoodLicense(event.target.files[0]); // Capture the first file
};
const handleMenuChange = (event) => {
  setMenu(event.target.files[0]); // Capture the first file
};
const handleLogoChange = (event) => {
setLogo(event.target.files[0]); // Capture the first file
};

  const handleSave = async () => {
    if (!truckBusinessName || !selectedFoodType || !truckCapacity || !foodLicense || !menu || !logo) {
      alert("All fields must be filled, including uploading all files.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const licenseUrl = await handleFileChange(foodLicense, 'licenses');
    const menuUrl = await handleFileChange(menu, 'menus');
    const logoUrl = await handleFileChange(logo, 'logos');
    const maxCapacityInt = parseInt(truckCapacity);

    if (!licenseUrl || !menuUrl || !logoUrl || isNaN(maxCapacityInt)) {
      alert("Failed to update all data correctly.");
      setIsLoading(false);
      return;
    }

    try {
      // Update main truck entry
      const truckRef = doc(db, "food-trucks", truckId);
      await updateDoc(truckRef, {
        business_name: truckBusinessName,
        food_type: selectedFoodType,
        max_capacity: maxCapacityInt,
        license: licenseUrl,
        menu: menuUrl,
        logo: logoUrl,
        open: isOpen,
      });

      // Update user-specific truck entry
      const userTruckRef = doc(db, "userToTrucks", currentUser.uid, "listOfTrucks", truckId);
      await updateDoc(userTruckRef, {
        business_name: truckBusinessName,
        food_type: selectedFoodType,
        max_capacity: maxCapacityInt,
        license: licenseUrl,
        menu: menuUrl,
        logo: logoUrl,
        open: isOpen,
      });

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
