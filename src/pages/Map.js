import { useState, useEffect } from 'react'
import GoogleMap from 'google-maps-react-markers'
import {app, db, auth, storage} from '../firebase'; 
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/button.js';

const Map = () => {
    const [center, setCenter] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [selected, setSelected] = useState(null);
    const db = getFirestore(app);
    let array = [];

    useEffect(() => {
        const getTrucks = async () => {
            const q = query(collection(db, "food-trucks"));
            const trucksSnapshot = await getDocs(q);
            trucksSnapshot.forEach((truck) => array.push(truck.data()));
            setTrucks(array);
        } 
        
        getTrucks();
    }, [])

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
        }, []);
    } catch (error) { console.log(error) }

    console.log(trucks[0]);
    console.log(center);

    return (
        <>
        <div style={{ display: "flex" }}>
            <div style={{ width: "25%", padding: "2%" }}>
            
            <h2>Price Range</h2>
            <mdui-segmented-button-group selects="multiple" style={{display: 'flex', justifyContent: 'center',width: '100%'}}>
            <mdui-segmented-button value="All">All</mdui-segmented-button>
            <mdui-segmented-button value="$">$</mdui-segmented-button>
            <mdui-segmented-button value="$$">$$</mdui-segmented-button>
            <mdui-segmented-button value="$$$">$$$</mdui-segmented-button>
            </mdui-segmented-button-group>
            
            <h2 style = {{marginTop: '100px'}}>Food Types</h2>
            <mdui-select multiple style = {{width: '100%'}}>
                <mdui-menu-item value="Mexican">Mexican</mdui-menu-item>
                <mdui-menu-item value="Chinese">Chinese</mdui-menu-item>
                <mdui-menu-item value="American">American</mdui-menu-item>
                <mdui-menu-item value="Taco">Taco</mdui-menu-item>
                <mdui-menu-item value="Hamburger">Hamburger</mdui-menu-item>
                <mdui-menu-item value="Pizza">Pizza</mdui-menu-item>
            </mdui-select>

            <mdui-button variant="tonal" style = {{marginTop: '100px', width: '100%', display: 'flex', justifyContent: 'center'}}>Save Preferences</mdui-button>

            </div>
        
        {!center && (
        <>  
            <div style={{position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)'}}>
                <h1>Just a moment...</h1>
                <mdui-circular-progress style={{left: '35%'}}></mdui-circular-progress>
            </div>
        </>
        )}

        {center &&
        <div style={{ width: "100%", overflow: "hidden", justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
            <GoogleMap
                apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
                defaultCenter={center}
                defaultZoom={13}
                mapMinHeight="100vh"
                // options={{ minZoom: 17}}
            >

            { trucks && trucks.map((truck) => 
                truck['open'] &&
                truck['verified'] &&
                <img
                    style={ {borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center'} }
                    lat={truck['location']._lat}
                    lng={truck['location']._long}
                    href='/'
                    alt={truck['business_name']}
                    src={truck['logo']}
                    height='50'
                    onClick={() => setSelected({'item': 'test'})}
                />) }
                <img
                    style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                    lat={center['lat']}
                    lng={center['lng']}
                    href='/'
                    alt='logo'
                    src='/logo.png'
                    height='50'
                />

            {selected && 
                <div style={{ width: "25%", padding: "2%" }}>
                    <h2>Price Range</h2>
                    <mdui-segmented-button-group selects="multiple" style={{display: 'flex', justifyContent: 'center',width: '100%'}}>
                    <mdui-segmented-button value="All">All</mdui-segmented-button>
                    <mdui-segmented-button value="$">$</mdui-segmented-button>
                    <mdui-segmented-button value="$$">$$</mdui-segmented-button>
                    <mdui-segmented-button value="$$$">$$$</mdui-segmented-button>
                    </mdui-segmented-button-group>
                </div>
        }
            </GoogleMap>
        </div> }
        </div>
        </>
    )
}

export default Map