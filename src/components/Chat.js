import { HashtagIcon, SearchIcon } from "@heroicons/react/outline";
import {
  ShoppingCartIcon,
  BellIcon,
  ChatIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";


const auth = getAuth();
const db = getFirestore();

function Chat() {
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const inputRef = useRef("");
  const chatRef = useRef(null);
  const uploadOptionsRef = useRef(null);
  const PlusCircleIconRef = useRef(null);
  const [messages] = useCollection(
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc"),
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showUploadOptions &&
        !uploadOptionsRef.current.contains(event.target) &&
        !PlusCircleIconRef.current.contains(event.target)
      ) {
        setShowUploadOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUploadOptions]);

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (inputRef.current.value !== "") {
      addDoc(collection(db, "channels", channelId, "messages"), {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoURL: user?.photoURL,
        email: user?.email,
      });
    }

    inputRef.current.value = "";
    scrollToBottom();
  };
  const toggleUpload = () => {
    setShowUploadOptions(!showUploadOptions);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <ShoppingCartIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
            />
            <SearchIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();

          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              name={name}
              email={email}
              photoURL={photoURL}
            />
          );
        })}
        <div ref={chatRef} className="pb-16" />
      </main>
      <div className="relative flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon
          className="icon mr-4"
          onClick={toggleUpload}
          ref={PlusCircleIconRef}
        />
        {showUploadOptions && (
          <div
            className="absolute bottom-full left-0 bg-white p-4 rounded-lg shadow-md w-1/4"
            ref={uploadOptionsRef}
          >
            <button className="block mb-2 text-left">Upload Image</button>
            <button className="block text-left">Upload Video</button>
          </div>
        )}
        <form className="flex-grow">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
}

export default Chat;
