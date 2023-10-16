import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase';

function SignInOverlay({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded w-full"
          onClick={handleEmailSignIn}
        >
          Sign in with Email
        </button>
        <button
          className="mt-4 text-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SignInOverlay;