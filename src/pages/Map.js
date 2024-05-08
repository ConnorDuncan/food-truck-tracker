import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { app } from '../firebase';
import { getFirestore, collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import GoogleMap from 'google-maps-react-markers';

import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/icon.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/button.js';
import '../components/drawer.css';
import '../components/toggle.css';
import '../pages/BusinessInfo.css';

const Map = () => {
    const db = getFirestore(app);
    const [center, setCenter] = useState(null);
    const { currentUser } = useAuth();
    const [userPhoto, setUserPhoto] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [select, setSelect] = useState(null);
    const [type, setType] = useState([]);
    const [drawerLoading, setDrawerLoading] = useState(true);
    const foodTypes = ['Chinese', 'Mexican', 'Desserts', 'Indian', 'Burgers', 'Pizza', 'Salad', 'Sandwiches', 'Dessert', 'Noodles', 'Fried', 'Seafood', 'Other'];


    const handleType = (typeKey) => {
        setType(prevType => {
            if (!prevType.includes(typeKey)) return [...prevType, typeKey]; 
            else return prevType.filter(item => item !== typeKey);
        });
    };

    useEffect(() => {
        // Fetch user photo from Firestore
        const fetchUserPhoto = async () => {
          if (currentUser) {
            const userDocRef = doc(db, 'userToInfo', currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists() && userDocSnap.data().photo) {
              setUserPhoto(userDocSnap.data().photo);
            }
          } console.log('FETCHED USER - READ FROM FIREBASE')
        };
    
        fetchUserPhoto();
    }, [currentUser]);

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
            console.log('FETCHED TRUCKS - READ FROM FIREBASE')
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
            'description': truck['description'],
            'id': truck.id
        });
    };
    
    // useEffect to set drawerLoading to false once setSelect is complete
    useEffect(() => {
        setDrawerLoading(false);
    }, [select]);

    return (
        <div style={{ display: "flex", overflowX: 'hidden' }}>
            <div className='overlay' onClick = {() => {
                document.querySelector('.overlay').classList.toggle('show-overlay');
                document.querySelector('.drawer').classList.remove('opened');
            }}>
            </div>
            <div style={{ width: "25%", padding: "2%", paddingTop: '10px' }}>
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
                    {foodTypes.map((foodType) => (
                        <li className={`option ${type.includes(foodType) ? 'option-clicked' : ''}`} 
                            onClick = {() => handleType(foodType)}>{foodType}
                        </li>
                    ))}
                </div>
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
                            (type.length === 0 || truck['food_type'].some(foodType => type.includes(foodType))) &&
                            <img
                                style={{ 
                                    borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', width: '40px', height: '40px', border: '3px solid green' 
                                }}
                                lat={truck['location']._lat}
                                lng={truck['location']._long}
                                href='/'
                                alt={truck['business_name']}
                                src={truck['logo']}
                                onClick={() => handleDrawerOpen(truck)}
                            />
                        )}
                        <img
                            style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', border: '3px solid #6dbbf8' }}
                            lat={center['lat']}
                            lng={center['lng']}
                            href='/'
                            alt='logo'
                            src={userPhoto ? userPhoto : './userIcon.jpeg'}
                            height='40px'
                        />
                    </GoogleMap>
                    
                    <div className='drawer'>
                        {drawerLoading && <mdui-circular-progress style={{left: '35%'}}></mdui-circular-progress>}
                        {select && !drawerLoading &&
                        <div>
                            <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                    <img 
                                        style = {{ borderRadius: '5px' }}
                                        width='40%'
                                        height='40%'
                                        alt='selected truck logo'
                                        src={ select['logo'] }
                                    />
                            </div>
                            <ul style = {{ padding: '12px' }}>
                                <div style = {{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                    <h2 style={{ padding: '5px', margin: '0' }}>{ select['business_name'] }</h2>
                                </div>

                                
                                    { select['food_type'].map((type) => 
                                    <div className='category' style={{ flexWrap: 'wrap', padding: '4px', marginLeft: '4px' }}>
                                        <h5 style={{ color:'gray', margin: '0' }}>
                                            { type }
                                        </h5>
                                    </div>)
                                    }
                                

                                <div style={{ marginTop: '20px' }}>
                                    <h2 style={{ paddingLeft: '5px', margin: '0' }}>Details</h2>
                                    <p style={{ paddingLeft: '5px', marginTop: '4px', color:'gray' }}>
                                        { select['description'].length > 220 ? select['description'].slice(0, 220) + '...' :  select['description']}  
                                        { select['description'].length > 220 && 
                                        <Link
                                            style={{ marginLeft: '5px', color: '#40547d' }} 
                                            to={`/business/info/${select['id']}`}>
                                            <b6>more</b6>
                                        </Link> }
                                    </p>
                                </div>

                                <a href={select['menu']} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        alt = 'menu'
                                        height = '175px'
                                        width = '100%'
                                        style={{ display: 'block', borderRadius: '5px', margin: '0 auto', objectFit: 'cover' }}
                                        src={select['menu']}
                                        href={select['menu']}
                                    />
                                </a>

                                <mdui-button variant="tonal" style={{ width: '80%', display: 'block', marginTop: '30px', margin: '30px auto 0' }}>
                                    <Link style={{ textDecoration: 'none' }} to={`/business/info/${select['id']}`}>Click to view more details</Link>
                                </mdui-button>
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