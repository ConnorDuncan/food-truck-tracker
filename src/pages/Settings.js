import React, { useEffect, useState } from 'react';
import './Settings.css';
import { useAuth } from '../components/AuthContext';

const Settings = () => {
    const { currentUser } = useAuth();

    const [description, setDescription] = useState('');

    useEffect(() => {
        
    })


    return (
        <div className="parent-container">
            <h1 className="Title">Settings</h1>
            <div className='cate'>
                <p className='inputlabel'>Name of Your Truck</p>
                <input className='infoinput' value={"Test"} onChange={(e) => setDescription(e.target.value)} />
            </div>
        </div>
        
    );
};

export default Settings;