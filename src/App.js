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
import AddTruck from './AddTruck.js';
import Settings from './pages/Settings.js';
import ProfileBusiness from './pages/ProfileBusiness.js';
import ProfileCustomer from './pages/ProfileCustomer.js';
import ProtectedCustomer from './components/ProtectedCustomer.jsx';
import ProtectedBusiness from './components/ProtectedBusiness.jsx';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/business/info' element={<ProtectedBusiness />}>
              <Route index element={<BusinessInfo />} />
            </Route>
            <Route path='/business/list' element={<ProtectedBusiness />}>
              <Route index element={<FoodTrucks />} />
            </Route>
            <Route path='/map' element={<ProtectedCustomer />}>
              <Route path='/map' element={<Map />} />
            </Route>
            <Route path='/business/login' element={<ProtectedBusiness />}>
              <Route index element={<BusinessLogin />} />
            </Route>
            <Route path='/customer/login' element={<ProtectedCustomer />}>
              <Route index element={<CustomerLogin />} />
            </Route>
            <Route path="/business/UpdateInfo/:truckId" element={<ProtectedBusiness />}>
              <Route index element={<UpdateInfo />} />
            </Route>
            <Route path="/business/AddTruck" element={<ProtectedBusiness />}>
              <Route index element={<AddTruck />} />
            </Route>
            <Route path="/user/Settings" element={<Protected />}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="/business/Profile" element={<ProtectedBusiness />}>
              <Route index element={<ProfileBusiness />} />
            </Route>
            <Route path="/customer/Profile" element={<ProtectedCustomer />}>
              <Route index element={<ProfileCustomer />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
