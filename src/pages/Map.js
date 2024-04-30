import { useState, useEffect } from 'react'
import GoogleMap from 'google-maps-react-markers'


//import MDUI components
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/button.js';

const Map = () => {
    const [center, setCenter] = useState(null)

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
        <div style={{ width: "60%", borderRadius: "10%", overflow: "hidden" , marginLeft: "5%"}}>
            <GoogleMap
                apiKey="AIzaSyCTPpsLTqqt0Dq0O-_qF6RjRE_W2CbmS_Q"
                defaultCenter={center}
                defaultZoom={13}
                mapMinHeight="85vh"
                options={{ minZoom: 17 }}
            >
                <img
                    lat={center['lat']}
                    lng={center['lng']}
                    href='/'
                    alt='logo'
                    src='/logo.png'
                    height='50'
                />
            </GoogleMap>
        </div>
        }
        </div>
        </>
    )
}

export default Map