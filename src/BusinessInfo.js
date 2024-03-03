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

export default BusinessInfo;
