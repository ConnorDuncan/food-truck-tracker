import React from 'react';
import { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '80vw',
  height: '80vh',
};

const Map = () => {
    const [center, setCenter] = useState(null)

    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
        } else console.log("Geolocation is not supported by this browser.");
    }, []);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q',
        libraries
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
        >
            <Marker position={center} />
        </GoogleMap>
        </div>
    );
};

export default Map;