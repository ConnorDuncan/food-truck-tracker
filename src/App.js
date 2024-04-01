import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import CustomerLogin from './pages/CustomerLogin'
import BusinessLogin from './pages/BusinessLogin'
import BusinessRegister from './pages/BusinessRegister'
import MyBusinesses from './pages/MyBusinesses'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/home" element = {<Home />} />
          <Route path="/customer/login" element = {<CustomerLogin />} />
          <Route path="/map" element = {<Map />} />
          <Route path="/business/login" element = {<BusinessLogin />} />
          <Route path="/business/register" element = {<BusinessRegister />} />
          <Route path="/my-businesses" element = {<MyBusinesses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
