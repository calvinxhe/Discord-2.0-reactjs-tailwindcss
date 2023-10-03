import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAXZIqaUy3IjKlkBpr-p0rkWzASutJWkYY",
  authDomain: "srko-84dd8.firebaseapp.com",
  projectId: "srko-84dd8",
  storageBucket: "srko-84dd8.appspot.com",
  messagingSenderId: "899335254887",
  appId: "1:899335254887:web:531cd5bcb9426cf40335c2",
  measurementId: "G-J9L9ETGMQP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
