import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth();
const db = getFirestore();

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [registering, setRegistering] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        setRegistering(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Set user metadata in Firestore
            await setDoc(doc(db, 'users', userId), {
                isPremium: isPremium
            });

            toast.success('Registration successful!');
        } catch (error) {
            toast.error(`Error registering: ${error.message}`);
        }

        setRegistering(false);
    };

    return (
        <div>
            <h2>Register</h2>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} />
                    Register as Premium User
                </label>
            </div>
            <button onClick={handleRegister} disabled={registering}>
                {registering ? 'Registering...' : 'Register'}
            </button>
            <ToastContainer />
        </div>
    );
}

export default Register;
