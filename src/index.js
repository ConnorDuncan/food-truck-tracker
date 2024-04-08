import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import BusinessInfo from './BusinessInfo';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './components/Protected';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login/>}/>
      <Route path="/" element={<Protected/>}>
        <Route path="/" element={<Home/>}/>

      </Route>

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router}></RouterProvider>
);
