import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './components/AuthContext';

const useFoodTrucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Ensure that currentUser is not null
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const fetchTrucks = async () => {
      setLoading(true);
      // Reference the sub-collection 'listOfTrucks' for the current user
      const trucksRef = collection(db, 'userToTrucks', currentUser.uid, 'listOfTrucks');
      try {
        const snapshot = await getDocs(trucksRef);
        const trucksArray = snapshot.docs.map(doc => ({
          id: doc.id, // The ID of the truck document
          ...doc.data() // Spread the rest of the data into the object
        }));
        setTrucks(trucksArray);
      } catch (error) {
        console.error("Error fetching food trucks:", error);
      }
      setLoading(false);
    };

    fetchTrucks();
  }, [currentUser]); // Dependency array includes currentUser to re-run the effect when currentUser changes

  const updateTruck = async (truckId, updatedData) => {
    const truckRef = doc(db, 'userToTrucks', currentUser.uid, 'listOfTrucks', truckId);
    const truckRefTwo = doc(db, "food-trucks", truckId);
    try {
      await updateDoc(truckRef, updatedData);
      await updateDoc(truckRefTwo, updatedData);
      // Optionally update the local state
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) => (truck.id === truckId ? { ...truck, ...updatedData } : truck))
      );
      console.log('Truck updated successfully!');
    } catch (error) {
      console.error('Error updating truck:', error);
    }
  };

  const createTruck = async (truckData) => {
    if (!currentUser) {
      console.error("No user found, cannot create truck.");
      return null;
    }
  
    const trucksRef = collection(db, 'userToTrucks', currentUser.uid, 'listOfTrucks');
    const trucksRefTwo = collection(db, 'food-trucks');
    const newTruckRef = doc(trucksRef);
    const newTruckRefTwo = doc(trucksRefTwo);
  
    try {
      await setDoc(newTruckRef, truckData);
      await setDoc(newTruckRefTwo, truckData);
      setTrucks(prevTrucks => [...prevTrucks, { id: newTruckRef.id, ...truckData }]);
      console.log("Truck created successfully:", newTruckRef.id);
      return newTruckRef.id;
    } catch (error) {
      console.error("Error creating truck:", error);
      return null;
    }
  };
  

  return { trucks, loading, updateTruck, createTruck };
};

export default useFoodTrucks;