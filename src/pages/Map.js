import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from 'google-maps-react-markers';
import { app } from '../firebase';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/button.js';
import '../components/drawer.css';
import '../components/toggle.css';
import '../pages/BusinessInfo.css';

const Map = () => {
    const db = getFirestore(app);
    const [center, setCenter] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [select, setSelect] = useState(null);
    const [type, setType] = useState([]);
    const [drawerLoading, setDrawerLoading] = useState(true); // Drawer loading state

    const handleType = (typeKey) => {
        setType(prevType => {
            if (!prevType.includes(typeKey)) return [...prevType, typeKey]; 
            else return prevType.filter(item => item !== typeKey);
        });
    };

    useEffect(() => {
        console.log(type);
    }, [type])

    useEffect(() => {
        const getTrucks = async () => {
            const q = query(collection(db, "food-trucks"));
            const trucksSnapshot = await getDocs(q);
            const trucksData = trucksSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTrucks(trucksData);
        };

        getTrucks();
    }, []);

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
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleDrawerOpen = (truck) => {
        setDrawerLoading(true);
        document.querySelector('.drawer').classList.add('opened');
        document.querySelector('.overlay').classList.add('show-overlay');
    
        setSelect({
            'header': truck['header'],
            'logo': truck['logo'],
            'menu': truck['menu'],
            'food_type': truck['food_type'],
            'business_name': truck['business_name'],
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'id': truck.id
        });
    };
    
    // useEffect to set drawerLoading to false once setSelect is complete
    useEffect(() => {
        setDrawerLoading(false);
        console.log(drawerLoading); // Logs false
    }, [select]);

    return (
        <div style={{ display: "flex" }}>
            <div className='overlay' onClick = {() => {
                document.querySelector('.overlay').classList.toggle('show-overlay');
                document.querySelector('.drawer').classList.remove('opened');
            }}>
            </div>
            <div style={{ width: "25%", padding: "2%" }}>
                <h1>Filter Food Types</h1>
                <div className='box' onClick = {() => document.querySelector('.options').classList.toggle('options-open')}>
                    {type.length ? type.map((item, index) => 
                        <div className='selected'>
                            {item}
                            <button className="exit-button" onClick={(event) => { event.stopPropagation(); handleType(item) }}>&times;</button>
                        </div>
                    ) : 'Any'}
                </div>
                <div className='options'>
                    <li className={`option ${type.includes('Mexican') ? 'option-clicked' : ''}`} onClick = {() => handleType('Mexican')}>Mexican</li>
                    <li className={`option ${type.includes('Chinese') ? 'option-clicked' : ''}`} onClick = {() => handleType('Chinese')}>Chinese</li>
                    <li className={`option ${type.includes('Burgers') ? 'option-clicked' : ''}`} onClick = {() => handleType('Burgers')}>Burgers</li>
                    <li className={`option ${type.includes('Desserts') ? 'option-clicked' : ''}`} onClick = {() => handleType('Desserts')}>Desserts</li>
                    <li className={`option ${type.includes('Sandwiches') ? 'option-clicked' : ''}`} onClick = {() => handleType('Sandwiches')}>Sandwiches</li>
                    <li className={`option ${type.includes('Ice Cream') ? 'option-clicked' : ''}`} onClick = {() => handleType('Ice Cream')}>Ice Cream</li>
                </div>

                <mdui-button variant="tonal" style={{ marginTop: '100px', width: '100%', display: 'flex', justifyContent: 'center' }}>Save Preferences</mdui-button>


            </div>

            {!center && (
                <>  
                    <div style={{position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)'}}>
                        <h1>Just a moment...</h1>
                        <mdui-circular-progress style={{left: '35%'}}></mdui-circular-progress>
                    </div>
                </>
            )}
            {center && (
                <div style={{ width: "100%", overflow: "hidden", justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <GoogleMap
                        apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
                        defaultCenter={center}
                        defaultZoom={15}
                        mapMinHeight="100vh"
                        options={{ minZoom: 13, fullscreenControl: false }}
                    >
                        {trucks && trucks.map((truck, index) =>
                            truck['open'] &&
                            (type.includes(truck['food_type']) || !type.length) &&
                            <img
                                style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', width: '50px', height: '50px' }}
                                lat={truck['location']._lat}
                                lng={truck['location']._long}
                                href='/'
                                alt={truck['business_name']}
                                src={truck['logo']}
                                onClick={() => handleDrawerOpen(truck)}
                            />
                        )}
                        <img
                            style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                            lat={center['lat']}
                            lng={center['lng']}
                            href='/'
                            alt='logo'
                            src='/logo.png'
                            height='50px'
                        />
                    </GoogleMap>
                    
                    <div className='drawer'>
                        {drawerLoading && <mdui-circular-progress style={{left: '35%'}}></mdui-circular-progress>}
                        {select && !drawerLoading &&
                        <div style={{ marginTop: '0' }}>
                            <ul>
                                {select['header'] && <div>
                                    <img 
                                    style = {{ justifyContent: 'center', alignItems: 'center', borderRadius: '5px', marginTop: '20px' }}
                                    width='90%'
                                    height='90%'
                                    src={ select['header'] }
                                    />
                                </div>}

                                <ul>
                                    <h1 style={{ padding: '5px', margin: '0' }}>{ select['business_name'] }</h1>
                                </ul>

                                <div className='selected' style={{ flexWrap: 'wrap', padding: '10px' }}>{ select['food_type'] }</div>
                                {/* <mdui-card style={{ width: '370px', height: '150px', padding: '10px', flexWrap: 'wrap' }}>
                                    <p style={{marginLeft:'15px', color:'gray'}}>{ select['description'] }</p>
                                </mdui-card>
                                <img 
                                    src={ select['menu'] }
                                    height='150'
                                />
                                <mdui-button variant="tonal" style={{ width: '80%', display:'flex', justifyContent:'center', marginTop:'30px' }}>
                                    <Link style={{ textDecoration: 'none' }} to={`/business/info/${select['id']}`}>Click to view more details</Link>
                                </mdui-button> */}
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Map;
