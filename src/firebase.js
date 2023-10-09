import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg7pDNsIXO0s-1ai2FDP9Td5BDoq1Phqg",
  authDomain: "circl-539dd.firebaseapp.com",
  projectId: "circl-539dd",
  storageBucket: "circl-539dd.appspot.com",
  messagingSenderId: "399002800874",
  appId: "1:399002800874:web:1a7e00edc49a2359ea7d93",
  measurementId: "G-28T0X2LHST"
};

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}else {
  firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
