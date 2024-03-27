"use client"
import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';
// import ReactLoading from 'react-loading';
// import axios from 'axios';
import dynamic from 'next/dynamic';
import { auth } from "../firebase/config";
import NavBar from '../components/SideBar';
import Header from '../components/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
// import { chatEngine } from 'react-chat-engine';
// import { Router } from '@/node_modules/next/router';


export default function Messages() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
      if (!loading && !user) {
          router.push('/sign-in');
      }
  }, [user, loading, router]);
  const CHAT_ENG_PID = process.env.NEXT_PUBLIC_CHAT_ENGINE_PID
// Retrieve the username and secret from localStorage if available
const [username, setUsername] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('username') || (auth.currentUser ? auth.currentUser.email : null) : ''
);

const [secret, setSecret] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('secret') || (auth.currentUser ? auth.currentUser.uid : null) : ''
);

// Update the username and secret in localStorage whenever they change
useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('username', username || '');
    }
}, [username]);

useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('secret', secret || '');
    }
}, [secret]);


  const ChatEngine = dynamic(() =>
    import("react-chat-engine").then((module) => module.ChatEngine)
  );
  const MessageFormSocial = dynamic(() =>
    import("react-chat-engine").then((module) => module.MessageFormSocial)
  );

  useEffect(() => {
    console.log('Username:', username);
    console.log('Secret:', secret);
  }, [username, secret]);

  return (
    <div className="container">
      <div className="navCont">
        <NavBar />
      </div>
      <div className="headContent">
        <div className="headCont">
          <Header />
        </div>
        <div className="content"></div>
    <div className={styles.container}>
      {/* <ChatEngine className={styles.chat}
        height="calc(100vh - 212px)"
        projectID={CHAT_ENG_PID}
        userName={username}
        userSecret={secret}
        offset={-6}
        renderNewMessageForm={() => <MessageFormSocial />}
        onConnect={(creds: any) => console.log("CREDS" + creds)}
        onFailAuth={(props: any) => console.log(props)}
      /> */}
    </div>
    </div>
    </div>

  );
}