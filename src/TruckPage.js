import './TruckPage.css'
import TruckIcon from './FoodTruckIcon'
import CheckCircleIcon from './CheckCircleIcon'
import ClockIcon from './ClockIcon'

/*This page should appears when users login successfully using business accounts*/



function BusinessPage() {
  return (
    <div className="Businesses">
      <header className="Business_header">
        <h1 className="Title">
          Your Food Trucks
        </h1>
        <p className="Description">
          Here are the trucks you own, including verified and the ones that waiting for verification
        </p>
      </header>

      <div className="card">
        <div className='card_content'>
          <TruckIcon/>
          Taco Time
          <div class="verified">Verified</div>
          <div className='check_circle'>
            <CheckCircleIcon/>
          </div>
          <a href="/detail_page">view details</a>
        </div>
      </div>

      <div className="card">
        <div className='card_content'>
          <TruckIcon/>
          Burger Bliss
          <div class="waiting">Waiting for Verification</div>
          <div className='clock_icon'>
            <ClockIcon/>
          </div>
          <a href="/detail_page">view details</a>
        </div>
      </div>

      <button class="button">Add a new food truck</button>

      
    </div>
  );
}

export default BusinessPage;
