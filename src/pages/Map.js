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
        
        // <GoogleMap
        //     apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
        //     defaultCenter={center}
        //     defaultZoom={17}
        //     mapMinHeight="50vh"
        // >
        // <img
        //     lat={center['lat']}
        //     lng={center['lng']}
        //     href='/'
        //     alt='logo'
        //     src='/logo.png'
        //     height='50'
        // />
        // </GoogleMap>

        <iframe
            title="Google Map"
            width="50%"
            height="500"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q&center=${center.lat},${center.lng}&zoom=17`}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
        />
        }
        </>
    )
}

export default Map