import React from 'react';
import { Link } from 'react-router-dom';
import './FoodTrucks.css';
import TruckIcon from './FoodTruckIcon';
import CheckCircleIcon from './CheckCircleIcon';
import ClockIcon from './ClockIcon';
import useFoodTrucks from './useFoodTrucks';
import { useNavigate } from 'react-router-dom';
import { GeoPoint } from 'firebase/firestore';

const FoodTrucks = () => {
  const navigate = useNavigate();
  const { trucks, loading, updateTruck } = useFoodTrucks();

  const navigateToPage = () => {
    navigate('/business/AddTruck');
  };

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

  const toggleOpenStatus = async (truckId, currentStatus) => {
    let updates = {};
    if(!currentStatus){
      const fetchedLocation = await fetchUserLocation();
      if (fetchedLocation) {
        updates.location = fetchedLocation;
      }
    }
    updates.open = !currentStatus;
    updateTruck(truckId, updates);
    document.getElementById('open-snackbar').open=true;
  };

  if (loading) {
    return (
      <div className="Businesses">
        <header className="Business_header">
          <h1 className="Title">Your Food Trucks</h1>
          <p className="Description">
            Here are the trucks you own, including those that are waiting for verification
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="Businesses">
      <header className="Business_header">
        <h1 className="Title">Your Food Trucks</h1>
        <p className="Description">
          Here are the trucks you own, including those that are waiting for verification
        </p>
        <mdui-button variant="tonal" onClick={navigateToPage}>Add a Food Truck</mdui-button>
      </header>
      <div className="truck-container">
        {trucks.length > 0 ? trucks.map((truck) => (
          <mdui-card style={{width: '700px', height: '150px', marginBottom: '20px'}}>
            <div key={truck.id} className="card-content">
              <TruckIcon />
              <h2>{truck.business_name || 'Unnamed Truck'}</h2>
              {truck.verified ?
                <>
                  <div className="verified">Verified</div>
                  <div className='check_circle'>
                    <CheckCircleIcon />
                  </div>
                  <mdui-snackbar closeable id="open-snackbar">
                    The truck is {truck.open ? "opened" : "closed"}
                </mdui-snackbar>
                  <mdui-button
                    variant="outlined"
                    onClick={() => toggleOpenStatus(truck.id, truck.open)}
                  >
                    {truck.open ? "Close" : "Open"}
                  </mdui-button>
                </> :
                <>
                  <div className="waiting">Waiting for Verification</div>
                  <div className='clock_icon'>
                    <ClockIcon />
                  </div>
                </>
              }
              <Link to={`/business/UpdateInfo/${truck.id}`}>Update Info</Link>
            </div>
          </mdui-card>
        )) : <p>No trucks available. Click below to add one now!</p>}
      </div>
    </div>
  );
};

export default FoodTrucks;
