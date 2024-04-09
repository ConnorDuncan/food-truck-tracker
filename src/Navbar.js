const Navbar = () => {
    return (  
        <nav className='navbar'>
            <a href='/'>
                <img
                    href='/'
                    alt='logo'
                    src='/logo.png'
                    height='120'
                />
            </a>
            <h1>VendorVista</h1>
            <div className='links'>
                <a href='/home' style={{
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '500px',
                    padding: '16px'
                    }}>Home</a>
                <a href='/business-info' style={{
                    color: 'white', 
                    backgroundColor: '#f1356d',
                    borderRadius: '500px',
                    padding: '16px'
                    }}>Log out</a>
            </div>
        </nav>
    );
}
 
export default Navbar;