import './BusinessInfo.css';
import StarIcon from '../components/StarIcon'
import CalendarIcon from '../components/CalendarIcon'
import ClockIcon from '../components/ClockIcon';
import MapPinIcon from '../components/MapPinIcon';
import PhoneIcon from '../components/PhoneIcon';
import Stars from '../components/Stars';

import 'mdui/mdui.css';
import 'mdui';
import 'mdui/components/card.js';


function BusinessInfo() {
  return (
    <div className="BusinessName">
      <header className="info-header">
        <h1>
          Business_name
        </h1>
      </header>

      <body>
        

        <mdui-card style={{width: '600px', height: '150px', marginTop: '30px'}}>

        <div className="location" style={{ marginLeft: '10px' }}>
          <MapPinIcon className="MapPinIcon" />
          Street
        </div>

        <div className="open" style={{ marginLeft: '10px' }}>
          <ClockIcon className="ClockIcon"></ClockIcon>
          Open today from 10:00 am to 5:00 pm
        </div>

        {/* <dix className="Intro" style={{ marginLeft: '10px' }}>
          This food truck sells tacos, hamburgers, pizzas etc. You can get what you've ordered in just 2 minutes!
        </dix> */}

        </mdui-card>
        
        <div className="horizontal-container">

        <mdui-card variant="elevated" style={{width: '600px', height: '250px', marginTop: '30px'}}>


            <h2 style={{ marginLeft: '10px'}}>Schedule</h2>

            <div className="open" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>  
              <div>Workday: 10:00 am to 7:00 pm</div>
              <CalendarIcon className="CalendarIcon" />
            </div>

            <div className="open" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>  
              <div>Weekend: 10:00 am to 7:00 pm</div>
              <CalendarIcon className="CalendarIcon" />
            </div>


          <div className="contact" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
            <div>(012) 345-6789</div>
            <div><PhoneIcon className="PhoneIcon"></PhoneIcon></div>
          </div>
          <div className="contact" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
            <div>(012) 345-6789</div>
            <div><PhoneIcon className="PhoneIcon"></PhoneIcon></div>
          </div>

        </mdui-card>
        

          <div className="dishes">
            <h2>Featured Dishes</h2>
            <div className="image-comment-container">
              <div className="dish">
                <img
                  alt="Dish #1"
                  height="260"
                  src="https://img.taste.com.au/qRDdmfsk/w720-h480-cfill-q80/taste/2022/09/healthy-tacos-recipe-181113-1.jpg"
                  
                />
                <div className="comment">
                  "Savor the perfect blend of flavors and textures in this delicious taco! A tasty delight in every bite!" 🌮😋
                </div>
              </div>
              

              <div className="dish">
                <img
                  alt="Dish #2"
                  src="https://assets.biggreenegg.eu/app/uploads/2019/03/28145521/topimage-classic-hamburger-2019m04-800x534.jpg"
                  height="260"
                />
                <div className="comment">
                  "good hamburger"
                </div>
              </div>
              
              
            </div>
            
          </div>
        </div>

          <div className='currRate'>
          Current Rate is: 4.8/5   Based on 99999 reviews
        </div>

        <Stars className='star'/>
        

        
        

      </body>
    </div>
  );
}

export default BusinessInfo;


