import { useState, useEffect } from 'react'
import GoogleMap from 'google-maps-react-markers'

const Map = () => {
    const [center, setCenter] = useState(null)

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
        {!center && <h1>Map is loading...</h1>}
        {center &&
        <GoogleMap
            apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
            defaultCenter={center}
            defaultZoom={17}
            mapMinHeight="100vh"
        >
        <img
            lat={34.4162656}
            lng={-119.8445736}
            href='/'
            alt='logo'
            src='/logo.png'
            height='50'
        />
        </GoogleMap>
        }
        </>
    )
}

export default Map