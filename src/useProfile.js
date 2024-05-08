import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './components/AuthContext';

const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Ensure that currentUser is not null
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      const profileRef = doc(db, 'userToInfo', currentUser.uid);
      try {
        const snapshot = await getDoc(profileRef);
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        } else {
          console.warn('No such profile!');
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  const updateProfile = async (updatedData) => {
    if (!currentUser) {
      console.error("No user found, cannot update profile.");
      return;
    }
  
    const profileRef = doc(db, 'userToInfo', currentUser.uid);
  
    try {
      await updateDoc(profileRef, updatedData);
      // Update local state
      setProfile(prevProfile => ({ ...prevProfile, ...updatedData }));
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { profile, loading, updateProfile };
};

export default useProfile;
