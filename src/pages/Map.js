import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        } else console.log("Geolocation is not supported by this browser.");
    }, []);

    return (
        <LoadScript
          id="script-loader"
          googleMapsApiKey={"AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"}
          language="en"
          region="EN"
          version="weekly"
        >
        <Map />
        <Map />
        <Map />
        </LoadScript>
      );
}

export default Map;