import { useState, useEffect } from 'react'
import GoogleMap from 'google-maps-react-markers'
import app from '../components/firebase.js';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const Map = () => {
    const [center, setCenter] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const db = getFirestore(app);
    let array = [];

    // useEffect(() => {
    //     const getTrucks = async () => {
    //         const q = query(collection(db, "food-trucks"));
    //         const trucksSnapshot = await getDocs(q);
    //         trucksSnapshot.forEach((truck) => array.push(truck));
    //         setTrucks(array);
    //     } 
        
    //     getTrucks();
    // })

    try {
        useEffect(() => {
            if ("geolocation" in navigator) {
                const watchId = navigator.geolocation.watchPosition((position) => {
                    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.error('Error occurred while getting geolocation:', error);
                });

                return () => {
                    navigator.geolocation.clearWatch(watchId);
                    };
            } else console.log("Geolocation is not supported by this browser.");
        });
    } catch (error) { console.log(error) }

    return (
        <>
        <div style={{ display: "flex" }}>
            <div style={{ width: "20%", padding: "10px" }}>
                <h2>Toggle</h2>
            </div>
        <title>Testing</title>
        {!center && <h1>Map is loading...</h1>}
        {center &&
        <GoogleMap
            apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
            defaultCenter={center}
            defaultZoom={13}
            mapMinHeight="100vh"
            options={{ minZoom: 17}}
        >

        {/* { trucks.map((truck) => <img
            lat={truck['latitude']}
            lng={truck['longitude']}
            href='/'
            alt={truck['business_name']}
            src='/logo.png'
            height='50'
            />) }

        { trucks.map((truck) => <h1>
            lat={center['lat']}
            lng={center['lng']}
            testing
            </h1>) } */}
            
        <img
            lat={center['lat']}
            lng={center['lng']}
            href='/'
            alt='logo'
            src='/logo.png'
            height='50'
        />
        </GoogleMap>
        }
        </div>
        </>
    )
}

export default Map