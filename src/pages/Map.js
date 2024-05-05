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
import '../pages/BusinessInfo.css';
import 'mdui/components/card.js';

const Map = () => {
    const db = getFirestore(app);
    const [center, setCenter] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [select, setSelect] = useState(null);
    const [drawerLoading, setDrawerLoading] = useState(false); // Drawer loading state

    const [type, setType] = useState({
        "Mexican": 0,
        "Chinese": 0,
        "American": 0,
        "Taco": 0,
        "Hamburger": 0,
        "Pizza": 0,
    });

    const handletype = (typeKey) => {
        setType(prevType => {
            const updatedType = { ...prevType };
            updatedType[typeKey] = updatedType[typeKey] ? 0 : 1;
            return updatedType;
        });
    };

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

        document.querySelector('.drawer').querySelector("mdui-navigation-drawer").open=true;




        // setDrawerLoading(true); // Set drawer loading to true
        document.querySelector('.drawer').classList.add('opened');
        setSelect({
            'header': truck['header'],
            'logo': truck['logo'],
            'menu': truck['menu'],
            'food_type': truck['food_type'],
            'business_name': truck['business_name'],
            'description': truck['description'],
            'id': truck.id
        });
        // setDrawerLoading(false); 
    };

    // Track when both images have loaded
    const [logoLoaded, setLogoLoaded] = useState(false);
    const [menuLoaded, setMenuLoaded] = useState(false);

    // Set loading status based on the images' loaded status
    useEffect(() => {
        if (logoLoaded && menuLoaded) {
            setDrawerLoading(false);
        }
    }, [logoLoaded, menuLoaded]);

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "25%", padding: "2%" }}>
                {/* Sidebar content */}
                <h2>Price Range</h2>
                <mdui-segmented-button-group selects="multiple" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <mdui-segmented-button value="All">All</mdui-segmented-button>
                    <mdui-segmented-button value="$">$</mdui-segmented-button>
                    <mdui-segmented-button value="$$">$$</mdui-segmented-button>
                    <mdui-segmented-button value="$$$">$$$</mdui-segmented-button>
                </mdui-segmented-button-group>

                <h2 style={{ marginTop: '100px' }}>Food types</h2>
                <mdui-select multiple style={{ width: '100%' }}>
                    <mdui-menu-item value="Mexican">Mexican</mdui-menu-item>
                    <mdui-menu-item value="Chinese">Chinese</mdui-menu-item>
                    <mdui-menu-item value="American">American</mdui-menu-item>
                    <mdui-menu-item value="Taco">Taco</mdui-menu-item>
                    <mdui-menu-item value="Hamburger">Hamburger</mdui-menu-item>
                    <mdui-menu-item value="Pizza">Pizza</mdui-menu-item>
                </mdui-select>

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
                        defaultZoom={13}
                        mapMinHeight="88vh"
                    >
                        {trucks && trucks.map((truck) =>
                            truck['open'] &&
                            truck['verified'] &&
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
                        <mdui-navigation-drawer placement="right" modal close-on-esc close-on-overlay-click contained>
                        {drawerLoading && <mdui-circular-progress style={{left: '35%'}}></mdui-circular-progress>}
                        {select && !drawerLoading &&
                        <div>
                            <ul>
                                <ul>
                                    <header className="drawer-header" style={{height: '5vh'}}>
                                        <h1>{ select['business_name'] }</h1>
                                    </header>
                                </ul>

                                <div className='drawer-header'>
                                    <img 
                                    style = {{ justifyContent: 'center', alignItems: 'center' ,marginTop:'40px', borderRadius: '10px'}}
                                    width='300px'
                                    height='100%'
                                    src={ select['header'] }
                                    />
                                </div>
                                
                                </ul>
                                <mdui-card variant="elevated" style={{marginLeft:'40px',width: '300px',height: '124px'}}>
                                    <p style={{marginLeft:'15px', color:'gray'}}>What kinds of food they are offering:</p>
                                    <p style={{marginLeft:'15px', color:'gray'}}>{ select['food_type'] }</p>
                                    
                                </mdui-card>

                                <mdui-card variant="filled" style={{marginLeft:'40px',marginTop:'30px',width: '300px',height: '124px'}}>
                                        <tag>{ select['description'] }</tag>
                                </mdui-card>
                                <div style={{ marginLeft:'60px' }}>
                                    <img 
                                        src={ select['menu'] }
                                        height='150'
                                        style={{marginLeft:'40px',marginTop:'30px', borderRadius: '10px'}}
                                    />
                                </div>

                                <mdui-button variant="tonal" style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                                    <Link style={{ textDecoration: 'none' }} to={`/business/info/${select['id']}`}>Click to view more details</Link>
                                </mdui-button>
                            </div>
                        }
                        </mdui-navigation-drawer>
                    </div>
                    <div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Map;