import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXZIqaUy3IjKlkBpr-p0rkWzASutJWkYY",
  authDomain: "srko-84dd8.firebaseapp.com",
  projectId: "srko-84dd8",
  storageBucket: "srko-84dd8.appspot.com",
  messagingSenderId: "899335254887",
  appId: "1:899335254887:web:531cd5bcb9426cf40335c2",
  measurementId: "G-J9L9ETGMQP"
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
