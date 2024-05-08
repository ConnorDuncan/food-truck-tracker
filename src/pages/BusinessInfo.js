import './BusinessInfo.css';
import '../components/drawer.css';
import ClockIcon from '../components/ClockIcon';
import MapPinIcon from '../components/MapPinIcon';
import PhoneIcon from '../components/PhoneIcon';
import EmailIcon from '../components/EmailIcon';

//import MDUI components
import 'mdui/mdui.css';
import 'mdui';
import 'mdui/components/card.js';

//import map
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { app } from '../firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import GoogleMap from 'google-maps-react-markers'
import axios from 'axios';

function BusinessInfo() {
  const db = getFirestore(app);
  const [center, setCenter] = useState(null);
  const { truckId } = useParams();
  const [truck, setTruck] = useState(null);
  const [address, setAddress] = useState('');
  const API_KEY = 'AIzaSyCdp6nKGP_hV1NNRB2EzMCCUF2sLWWwQww';

  useEffect(() => {
      try {
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
      } catch (error) {
          console.log(error);
      }
  }, []);

  useEffect(() => {
    const getTruck = async () => {
        const docRef = doc(db, 'food-trucks', truckId);
        const docSnap = await getDoc(docRef);
        setTruck(docSnap.data())
    };

    getTruck();
  }, []);

  useEffect(() => {
    const reverseGeocode = async (latitude, longitude) => {
      try {
          // Make a GET request to the Google Maps Geocoding API
          const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
          );
          // Extract the formatted address from the response
          const formattedAddress = response.data.results[0].formatted_address;
          setAddress(formattedAddress);
      } catch (error) {
          console.error('Error fetching reverse geocode:', error);
      }
  };
  
    if (truck) reverseGeocode(truck['location']._lat, truck['location']._long);
    else setAddress('This truck is closed');
  }, [truck])

  return (
    <>
    {truck && (
    <div className="BusinessName">
      {truck && <header className="info-header" style={{ width: '100%', height: '50px',display: 'flex', alignItems: 'center', justifyContent:"center" }}>
        <h1>
          {truck['business_name']}
        </h1>
      </header>}

      <body style={{ maxHeight: '100%', overflowY: 'hidden' }}>
        
      <div className="horizontal-container">
        <mdui-card style={{width: '600px', height: '180px', marginLeft:'2%',marginTop: '30px'}}>
        <div className="location" style={{ marginLeft: '10px' }}>
          <MapPinIcon className="MapPinIcon" />
          { address }
        </div>

        {truck && <div className="open" style={{ marginLeft: '20px', alignItems: 'center', display:'flex', justifyContent:'space-between' }}>
          
          {truck['open'] && <p1 style={{ fontSize: '20px', color: 'green' }}>Open</p1>}
          {!truck['open'] && <p1 style={{ fontSize: '20px', color: 'red' }}>Closed</p1>}
          <ClockIcon className="ClockIcon" style={{ marginRight: '20px'}}></ClockIcon>
        </div>}

        <div style={{marginLeft: '10px'}}>
        { truck['food_type'].map((type) => 
          <div className='category' style={{ flexWrap: 'wrap', padding: '4px', marginLeft: '4px' }}>
              <h5 style={{ color:'gray', margin: '0' }}>
                  { type }
              </h5>
          </div>)
        }
        </div>
        </mdui-card>

      <div style={{ width: "45%", overflow: "hidden", marginRight:'80px' }}>
          {/* <div style={{ position: "relative", height: "35vh" }}>
            <h2 style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}>
              Just a moment...
            </h2>
            <mdui-circular-progress style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)" }} />
          </div> */}
        {truck && (
          <GoogleMap
            apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
            defaultCenter={{'lat': truck['location']._lat, 'lng': truck['location']._long}}
            defaultZoom={13}
            mapMinHeight="35vh"
            options={{ minZoom: 17 }}
          >
            {truck['open'] && <img
              style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', width: '50px', height: '50px' }}
              lat={truck['location']._lat}
              lng={truck['location']._long}
              href="/"
              alt="logo"
              src={truck['logo']}
              height="50"
            />}

            {center && <img
                style={{ borderRadius: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                lat={center['lat']}
                lng={center['lng']}
                href='/'
                alt='logo'
                src='/logo.png'
                height='50px'
            />}
          </GoogleMap>
        )}
      </div>
      

    </div>
    

        <div className="horizontal-container">

        <mdui-card variant="elevated" style={{ width: '600px', height: '120px', marginLeft:'2%', marginTop: '30px', transform: 'translateY(-100px)'}}>

          <div className="contact" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
            <div>{ truck['phone'] }</div>
            <div><PhoneIcon className="PhoneIcon"></PhoneIcon></div>
          </div>
          <div className="contact" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
            <div>{ truck['email'] }</div>
            <div><EmailIcon className="PhoneIcon"></EmailIcon></div>
          </div>

        </mdui-card>
        

          <div className="dishes" style={{marginRight:'80px'}}> 
          <div style={{display:'flex'}}>
            <h2>Description</h2>
            <img
                style={{ borderRadius: '10%', justifyContent: 'center', display: 'flex', alignItems: 'center', width: '40px', height: '40px',marginLeft:'30px',transform: 'translateY(15px)'}}
                lat={truck['location']._lat}
                lng={truck['location']._long}
                href="/"
                alt="logo"
                src={truck['logo']}

              />
          </div>
            <mdui-card variant="elevated" style={{ padding: '10px',display: 'flex', alignItems: 'center' }}>
                <div className="comment">
                  <p style={{ paddingLeft: '5px', marginTop: '4px', color:'gray',fontSize: '20px' }}>
                    { truck['description'] }  
                  </p>
                </div>
            </mdui-card>
            
          </div>
        </div>

        <a href={truck['menu']} target="_blank" rel="noopener noreferrer">
        <img
        style={{
            position: 'absolute',
            left: 0,
            top: '75%',
            borderRadius: '10%',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '300px',
            maxHeight: '500px',
            marginTop: '30px',
            marginLeft: '12%',
        // transform: 'translateY(-200px)', // Remove or adjust this property
    }}
    href="/"
    alt="logo"
    src={truck['menu']}
/>
</a>
      </body>
    </div>
    )}</>
  );
}

export default BusinessInfo;


