import './BusinessInfo.css';
import StarIcon from './StarIcon'
import CalendarIcon from './CalendarIcon'
import ClockIcon from './ClockIcon';
import MapPinIcon from './MapPinIcon';


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
          <MapPinIcon className="MapPinIcon w-5 h-5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
          Street
        </div>

        <div className="open">
          <ClockIcon className="ClockIcon w-5 h-5 flex-shrink-0 text-gray-500 dark:text-gray-400"></ClockIcon>
          Open today from 10:00 am to 5:00 pm
        </div>

        <div className="Intro">This food truck sells tacos, hamburgers, pizzas etc. You can get what you've ordered in just 2 minutes!</div>

        <div className="grid gap-2">
          <div className="stars flex items-center gap-2">
            <StarIcon className="filled" />
            <StarIcon className="filled" />
            <StarIcon className="filled" />
            <StarIcon className="empty" />
            <StarIcon className="empty" />
          </div>
        </div>
        

        
        <div className="schedule">
          
          <h2>Schedule</h2>
          <CalendarIcon className="CalendarIcon w-5 h-5 text-gray-500 dark:text-gray-400" />
          Workday: 10:00 am to 7:00 pm
          <br/>
          <CalendarIcon className="CalendarIcon w-5 h-5 text-gray-500 dark:text-gray-400" />
          Weekend: 11:00 am to 7:00 pm
        </div>
        

        <div className="dishes grid gap-2">
          <h2>Featured Dishes</h2>
          <img
          alt="Dish #1"
          className="rounded-lg object-cover"
          height="160"
          src="/placeholder.svg"
          style={{
          aspectRatio: "160/160",
          objectFit: "cover",
          }}
          width="160"
          />
        </div>
        

      </body>

    </div>
  );
}

export default BusinessInfo;


