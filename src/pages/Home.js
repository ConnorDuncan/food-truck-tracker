import React from 'react';
import '../styling/Home.css';

export default function Home() {
  return (
    <div className="container-style">
      <div className="container">
        <div className="w-1/2">
          <h2 className="text-style">Welcome to Our Business</h2>
          <p className="text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.</p>
        </div>
        <div className="layout">
          <button className="blue-button blue-button-with-margin">Login for Customers</button>
          <button className="green-button green-button-with-margin">Login for Businesses</button>
        </div>
      </div>
    </div>
  );
}

