import { auth } from '../firebase';
import React, { useState } from 'react';
import SignInOverlay from './signInOverlay';
import { MenuIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    setShowSignInOverlay(true);
  };

  return (
    <div>
    <header className="bg-discord_blue flex items-center justify-between py-4 px-6">
      <a href="/">
        <img
          src="https://media.istockphoto.com/id/1372401945/photo/modern-black-picture-or-square-photo-frame-isolated.webp?b=1&s=170667a&w=0&k=20&c=bmXOZlLuoGDq9RtS64i1JWl8nz1lKg-2hVE1SRT8I8E="
          className="w-32 h-12 object-contain"
          alt=""
        />
      </a>
      <div className="hidden lg:flex  space-x-6 ">
        <a className="link">Download</a>
        <a className="link">Why Discord?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          onClick={!user ? signIn : () => navigate("/channels")}
        >
          {!user ? "Login" : "Open Discord"}
        </button>
        <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
    {showSignInOverlay && <SignInOverlay onClose={() => setShowSignInOverlay(false)} />} 
  </div>
  );
}

export default Header;
