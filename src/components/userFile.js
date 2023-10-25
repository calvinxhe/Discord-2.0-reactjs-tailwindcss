import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const auth = getAuth();

const defaultData = {
    subscriptions: [],
    friends: [],
    followers: [],
    liked: [],
    servers: {
        joined: [],
        owned: [],
        isAdmin: []
    },
    blocked: []
};

const setDefaultValues = (obj, defaultObj) => {
    for (let key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            obj[key] = defaultObj[key];
        } else if (typeof obj[key] === 'object') {
            setDefaultValues(obj[key], defaultObj[key]);
        }
    }
};

const addUserToFirestore = async (userid, username) => {
    const userRef = doc(db, "users", userid);

    const userData = {
        username: username,
        userid: userid,
        isPremium: false,
        subscriptions: [],
        friends: [],
        followers: [],
        liked: [],
        servers: {
            joined: [],
            owned: [],
            isAdmin: []
        },
        blocked: []
    };

    setDefaultValues(userData, defaultData);

    await setDoc(userRef, userData);
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            addUserToFirestore(user.uid, user.displayName || "Anonymous");
        } else {
            const userData = userSnap.data();
            setDefaultValues(userData, defaultData);
            await setDoc(userRef, userData);
        }
    }
});
