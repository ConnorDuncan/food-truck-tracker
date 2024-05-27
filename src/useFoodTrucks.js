import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './components/AuthContext';

const useFoodTrucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const fetchTrucks = async () => {
      setLoading(true);
      const trucksRef = collection(db, 'userToTrucks', currentUser.uid, 'listOfTrucks');
      try {
        const snapshot = await getDocs(trucksRef);
        const trucksArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrucks(trucksArray);
      } catch (error) {
        console.error("Error fetching food trucks:", error);
      }
      setLoading(false);
    };

    fetchTrucks();
  }, [currentUser]);

  const updateTruck = async (truckId, updatedData) => {
    const truckRef = doc(db, 'userToTrucks', currentUser.uid, 'listOfTrucks', truckId);
    const truckRefTwo = doc(db, "food-trucks", truckId);
    try {
      await updateDoc(truckRef, updatedData);
      await updateDoc(truckRefTwo, updatedData);
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
  
    // Generate a new document ID from one reference and use it for both
    const trucksRef = collection(db, 'userToTrucks', currentUser.uid, 'listOfTrucks');
    const trucksRefTwo = collection(db, 'food-trucks');
    const newTruckRef = doc(trucksRef); // Auto-generate ID from the first reference
    const newTruckRefTwo = doc(trucksRefTwo, newTruckRef.id); // Use the same ID for the second reference
  
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
