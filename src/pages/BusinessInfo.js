import './BusinessInfo.css';
import '../components/drawer.css';
import CalendarIcon from '../components/CalendarIcon'
import ClockIcon from '../components/ClockIcon';
import MapPinIcon from '../components/MapPinIcon';
import PhoneIcon from '../components/PhoneIcon';
import EmailIcon from '../components/EmailIcon';
import Stars from '../components/Stars';

//import MDUI components
import 'mdui/mdui.css';
import 'mdui';
import 'mdui/components/card.js';

//import map
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import GoogleMap from 'google-maps-react-markers'
import { app } from '../firebase';
import { getFirestore, collection, query, where, getDoc, doc } from "firebase/firestore";

function BusinessInfo() {
  const db = getFirestore(app);
  const [center, setCenter] = useState(null);
  const { truckId } = useParams();
  const [truck, setTruck] = useState(null);

  useEffect(() => {
      console.log('Truck ID:', truckId);
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

  return (
    <>
    {truck && (
    <div className="BusinessName">
      {truck && <header className="info-header" style={{ width: '100%', height: '50px' }}>
        <h1>
          {truck['business_name']}
        </h1>
      </header>}

      <body>
        
      <div className="horizontal-container">
        <mdui-card style={{width: '600px', height: '180px', marginLeft:'8%',marginTop: '30px'}}>

        <div className="location" style={{ marginLeft: '10px' }}>
          <MapPinIcon className="MapPinIcon" />
          Street
        </div>

        {truck && <div className="open" style={{ marginLeft: '10px', alignItems: 'center' }}>
          <ClockIcon className="ClockIcon"></ClockIcon>
          {truck['open'] && <p1 style={{ color: 'green' }}>Open</p1>}
          {!truck['open'] && <p1 style={{ color: 'red' }}>Closed</p1>}
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

      <div style={{ width: "50%", overflow: "hidden" }}>
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

        <mdui-card variant="elevated" style={{ width: '600px', height: '120px', marginLeft:'8%'}}>

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
            <h2>Description</h2>
            <mdui-card variant="elevated" style={{ width: "100%",padding: '10px' }}>
                <div className="comment">
                  <p style={{ paddingLeft: '5px', marginTop: '4px', color:'gray' }}>
                    { truck['description'] }  
                  </p>
                </div>
            </mdui-card>
            
          </div>
        </div>

        
        

        
        

      </body>
    </div>
    )}</>
  );
}

export default BusinessInfo;


