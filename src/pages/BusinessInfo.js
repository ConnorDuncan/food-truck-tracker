import './BusinessInfo.css';
import StarIcon from '../components/StarIcon'
import CalendarIcon from '../components/CalendarIcon'
import ClockIcon from '../components/ClockIcon';
import MapPinIcon from '../components/MapPinIcon';
import PhoneIcon from '../components/PhoneIcon';


function BusinessInfo() {
  return (
    <div className="BusinessName">
      <header className="info-header">
        <h1>
          Business_name
        </h1>
      </header>

      <body>
        
        <div className="location">
          <MapPinIcon className="MapPinIcon" />
          Street
        </div>

        <div className="open">
          <ClockIcon className="ClockIcon"></ClockIcon>
          Open today from 10:00 am to 5:00 pm
        </div>

        <div className="Intro">This food truck sells tacos, hamburgers, pizzas etc. You can get what you've ordered in just 2 minutes!</div>

        <div className="grid gap-2">
          <div className="stars">
            <StarIcon className="filled" />
            <StarIcon className="filled" />
            <StarIcon className="filled" />
            <StarIcon className="empty" />
            <StarIcon className="empty" />
          </div>
        </div>
        

        
        <div className="horizontal-container">
          <div className="schedule">
            <h2>Schedule</h2>
            <CalendarIcon className="CalendarIcon" />
            Workday: 10:00 am to 7:00 pm
            <br/>
            <CalendarIcon className="CalendarIcon" />
            Weekend: 11:00 am to 7:00 pm
          </div>

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

        <div className="contact">
          <PhoneIcon className="PhoneIcon"></PhoneIcon>
          Contect information:
          <br/>
          <br/>
          Phone: (012) 345-6789
        </div>
        

      </body>
    </div>
  );
}

export default BusinessInfo;


