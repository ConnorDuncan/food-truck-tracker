import React, { useEffect, useState } from 'react';
import './Settings.css';
import { useAuth } from '../components/AuthContext';
import { TextField } from '@material-ui/core';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useProfile from '../useProfile';
import { useParams, useNavigate } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

const Settings = () => {
    const { currentUser, isCustomer } = useAuth();
    const { profile, updateProfile } = useProfile();
    const [description, setDescription] = useState(profile.description || '');
    const [photoInput, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const handleFileChange = async (file, path) => {
        if (!file) return null;
        const storageRef = ref(storage, `uploads/${path}/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    };


    const handleSave = async () => {
        setLoading(true);
        if (!currentUser) return;

        let updates = {};
        if (photoInput) {
            const photoUrl = await handleFileChange(photoInput, 'photos');
            if (photoUrl) updates.photo = photoUrl;
        }
        if (description.length) updates.description = description;
        if(name.length) updates.name = name;
        if(email.length) updates.email = email;
        await updateProfile(updates);
        setLoading(false);
        if(isCustomer){
            navigate('/customer/Profile');
        }
        else{
            navigate('/business/Profile');
        }
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Loading, please do not close the page, refresh the page, or click the back button.</p>
            </div>
        );
    }

    return (
        <div className="parent-container">
            <h1 className="Title">Settings</h1>
            <div className='cate'>
                <p className='inputlabel'>Upload a profile picture</p>
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    id="photoInput"
                    style={{ display: 'none' }}
                />
                <mdui-button
                    variant="outlined"
                    component="label"
                    onClick={() => document.getElementById('photoInput').click()}
                >
                    {photoInput ? photoInput.name : "No file chosen"}
                </mdui-button>
            </div>
            <div className='cate'>
                <TextField
                label="Name"
                style={{ width: '300px' }}
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='cate'>
                <TextField
                    label="Description"
                    rows={3}
                    multiline
                    style={{ width: '300px' }}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='cate'>
                <TextField
                label="Email"
                style={{ width: '300px' }}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='buttonContainer'>
                <mdui-button variant="elevated" style={{ width: "150px" }} onClick={() => window.history.back()}>Back</mdui-button>
                <mdui-button variant="tonal" style={{ width: "150px" }} onClick={handleSave}>Save</mdui-button>
            </div>
        </div>
    );
};

export default Settings;
