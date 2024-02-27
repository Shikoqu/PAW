import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUX_XbxHmQn3rbZwXjrVQSWkzSbq3RI-k",
  authDomain: "my-travel-agency-227e6.firebaseapp.com",
  projectId: "my-travel-agency-227e6",
  storageBucket: "my-travel-agency-227e6.appspot.com",
  messagingSenderId: "753937911881",
  appId: "1:753937911881:web:841b61bc779bfc0f6f2f98",
  measurementId: "G-DVHSWN0LHZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);