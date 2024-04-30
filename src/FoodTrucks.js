import React from 'react';
import { Link } from 'react-router-dom';
import './FoodTrucks.css';
import TruckIcon from './FoodTruckIcon';
import CheckCircleIcon from './CheckCircleIcon';
import ClockIcon from './ClockIcon';
import useFoodTrucks from './useFoodTrucks';  // Importing the custom hook
import { useNavigate } from 'react-router-dom';
import 'mdui/components/button.js';

const FoodTrucks = () => {
    const navigate = useNavigate();
    const { trucks, loading } = useFoodTrucks();

    const navigateToPage = () => {
        navigate('/business/AddTruck');
    };

    if (loading){ return (<div className="Businesses">
    <header className="Business_header">
        <h1 className="Title">Your Food Trucks</h1>
        <p className="Description">
            Here are the trucks you own, including those that are waiting for verification
        </p>
    </header>
    
    </div>
    );}
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
                        <h2>{truck.business_name || 'Unnamed Truck'}</h2> {/* Use business_name field */}
                        {truck.verified ?
                            <>
                                <div className="verified">Verified</div>
                                <div className='check_circle'>
                                    <CheckCircleIcon />
                                </div>
                            </> :
                            <>
                                <div className="waiting">Waiting for Verification</div>
                                <div className='clock_icon'>
                                    <ClockIcon />
                                </div>
                            </>
                        }
                        <Link to={`/business/UpdateInfo/${truck.id}`}>view details</Link>
                </div>
                </mdui-card>
            )) : <p>No trucks available. Click below to add one now!</p>}  {/* Show message if no trucks are found */}
            </div>
        </div>
    );
};

export default FoodTrucks;