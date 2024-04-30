import React from 'react';
import { Link } from 'react-router-dom';
import './TruckPage.css';
import TruckIcon from './FoodTruckIcon';
import CheckCircleIcon from './CheckCircleIcon';
import ClockIcon from './ClockIcon';
import useFoodTrucks from './useFoodTrucks';  // Importing the custom hook

const FoodTrucks = () => {
    const { trucks, loading } = useFoodTrucks();

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
            </header>
            
            {trucks.length > 0 ? trucks.map((truck) => (
                <div key={truck.id} className="card">
                    <div className='card_content'>
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
                </div>
            )) : <p>No trucks available.</p>}  {/* Show message if no trucks are found */}

            <button className="button">Add a new food truck</button>
        </div>
    );
};

export default FoodTrucks;
