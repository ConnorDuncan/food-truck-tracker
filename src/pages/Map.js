import React from 'react';
import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';

export default function Map(){
    const [center, setCenter] = useState(null)

    useEffect(() => {
            if ("geolocation" in navigator) {
                const watchId = navigator.geolocation.watchPosition((position) => {
                    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
                    console.log(position.coords.latitude)
                    console.log(position.coords.longitude )
                    console.log(center)
                },
                (error) => {
                    console.error('Error occurred while getting geolocation:', error);
                });

                return () => {
                    navigator.geolocation.clearWatch(watchId);
                  };
            } else console.log("Geolocation is not supported by this browser.");
        }, []);
  
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        {!center && <h1>Map is loading...</h1>}
        {center &&
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q" }}
            defaultZoom={17}
            center={center}
        >
            <img
                lat={34}
                lng={-117}
                href='/'
                alt='logo'
                src='/logo.png'
                height='50'
            />
        </GoogleMapReact>
}
      </div>
    );
}