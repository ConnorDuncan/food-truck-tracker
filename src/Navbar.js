import './Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <a href="/" className="logo"> 
          <img src="/logo.png" alt="logo" height="50" /> 
        </a>
  
        <h1>VendorVista</h1>
  
        <div className="links">
          <a href="/home" className="nav-link">Home</a>
          <a href="/map" className="nav-link">Map</a>
          <a href="/business-info" className="nav-link">Log out</a>
        </div>
      </nav>
    );
  };
 
export default Navbar;