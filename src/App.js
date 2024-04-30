import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './pages/Home';
import BusinessInfo from './pages/BusinessInfo';
import Map from './pages/Map.js';
import { AuthProvider } from './components/AuthContext';
import BusinessLogin from './pages/BusinessLogin';
import CustomerLogin from './pages/CustomerLogin';
import Protected from './components/Protected.jsx';
import NotFound from './pages/FourOhFour.js';
import FoodTrucks from './FoodTrucks.js';  // Make sure this is the component, not useFoodTrucks hook
import UpdateInfo from './UpdateInfo.js';

function App() {
  // const ref = firebase.firestore().collection("food-trucks")
  // console.log(ref);
  
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/business/info' element={<Protected />}>
              <Route index element={<BusinessInfo />} />
            </Route>
            <Route path='/business/list' element={<Protected />}>
              <Route index element={<FoodTrucks />} />
            </Route>
            <Route path='/map' element={<Map />} />
            <Route path='/business/login' element={<Protected />}>
              <Route index element={<BusinessLogin />} />
            </Route>
            <Route path='/customer/login' element={<Protected />}>
              <Route index element={<CustomerLogin />} />
            </Route>
            <Route path="/business/UpdateInfo/:truckId" element={<Protected />}>
              <Route index element={<UpdateInfo />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
