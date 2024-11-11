import { initializeApp } from 'firebase/app'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDPG4unAFoWaVwO3-ZWiTTyvrhDJdBxWsw",
  authDomain: "bookapplication-2af85.firebaseapp.com",
  projectId: "bookapplication-2af85",
  storageBucket: "bookapplication-2af85.appspot.com",
  messagingSenderId: "263509709577",
  appId: "1:263509709577:web:e7a7e55b5ecd6cbe2939d8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
