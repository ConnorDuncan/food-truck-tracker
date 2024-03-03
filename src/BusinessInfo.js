import './BusinessInfo.css';

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


        <div className="schedule">
          
          <h2>Schedule</h2>
          <CalendarIcon className="CalendarIcon w-5 h-5 text-gray-500 dark:text-gray-400" />
          Workday: 10:00 am to 7:00 pm
          <br/>
          <CalendarIcon className="CalendarIcon w-5 h-5 text-gray-500 dark:text-gray-400" />
          Weekend: 11:00 am to 7:00 pm
        </div>
        


      </body>

    </div>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

export default BusinessInfo;

