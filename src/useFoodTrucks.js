import { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
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
    
      const usersRef = doc(db, 'userToInfo', currentUser.uid); // Changed to 'doc' instead of 'collection'
      const trucksRef = collection(db, 'userToTrucks', currentUser.uid, 'listOfTrucks');
    
      try {
        const userSnapshot = await getDoc(usersRef); // Fetch the user's document
        if (userSnapshot.exists()) {
          let { numReads = 0 } = userSnapshot.data(); // Default to 0 if not set
    
          if (numReads >= 5000) {
            console.error("Read limit exceeded");
            return; // Stop further execution if read limit exceeded
          }
    
          // Increment the numReads and update the user document
          await updateDoc(usersRef, { numReads: numReads + 1 });
    
          // Proceed to fetch trucks
          const snapshot = await getDocs(trucksRef);
          const trucksArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTrucks(trucksArray);
        } else {
          console.error("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    
      setLoading(false);
    };
    

    fetchTrucks();
  }, [currentUser]); // Dependency array includes currentUser to re-run the effect when currentUser changes

  return { trucks, loading };
};

export default useFoodTrucks;
