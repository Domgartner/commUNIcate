// "use client" 
// import React, { useState, useEffect, useRef } from 'react';
// import MsgFriend from '../components/msgFriend';
// import styles from './Messages.module.css';
// import ReactLoading from 'react-loading';
// // import axios from 'axios'; // Import Axios for making HTTP requests

// export default function Messages() {
//   // State to manage the input message
//   const [inputMessage, setInputMessage] = useState('');
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [friends, setFriends] = useState([]);
//   const [activeFriend, setActiveFriend] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // State to store sent messages
//   const [messages, setMessages] = useState([
//     { sender: 'John Doe', text: 'Hey, how are you?' },
//     { sender: 'You', text: 'I\'m good, thanks! How about you?' }
//   ]);

//   const messageContainerRef = useRef<HTMLDivElement>(null);

//   // Function to handle sending a message
//   const handleSendMessage = async () => {
//     if (inputMessage.trim() !== '') {
//       // Add the new message to the messages array
//       setMessages([...messages, { sender: 'You', text: inputMessage }]);
//       // Clear the input field after sending the message
//       setInputMessage('');
  
//       // Send the message to the backend server
//       try {
//         // await axios.post('http://localhost:5000/send-message', { message: inputMessage });
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
  
//       // Scroll to the bottom of the message container with a slight delay
//       setTimeout(() => {
//         messageContainerRef.current?.scrollTo({
//           top: messageContainerRef.current?.scrollHeight,
//           behavior: 'smooth'
//         });
//       }, 100);
//     }
//   };
  
  

//   async function fetchFriends() {
//     setIsLoading(true);
//     try {
//       let url = `https://6cqznmwlnxzdernedtxllbnisu0phaaf.lambda-url.ca-central-1.on.aws/?filter=${"Following"}`; 
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch friends');
//       }
//       const responseData = await response.json();
//       console.log('Response Data:', responseData);
//       const friendsData = responseData.data || [];
//       setFriends(friendsData);
//       setActiveFriend(friendsData[0].id);
//     } catch (error) {
//       console.error('Error fetching friends:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
  
  
//   useEffect(() => {
//     fetchFriends();
//   }, []); 

//   const filteredFriends = friends.filter((friend) =>
//     (friend.name && friend.name.toLowerCase().includes(searchKeyword.toLowerCase()))
//   );  

//   const handleFriendClick = (friendId: any) => {
//     setActiveFriend(friendId);
//     console.log('Friend clicked:', friendId);
    
//   };
  

//   return (
//     <div className={styles.container}>
//       <div className={styles.messageList}>
//         <div className={styles.SearchBar}>
//           <input type="text" placeholder="Search..." className={styles.Input} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
//         </div>
//         <div className={styles.friendsArea}>
//         {isLoading ? (
//           <div className={styles.loading}>
//             <ReactLoading type={'spin'} color={'rgba(0, 0, 0, 1)'} height={50} width={50} />
//           </div>
//         ) : (
//           filteredFriends.map((friend, index) => (
//             <div onClick={() => handleFriendClick(friend.id)} key={index} className={styles.sideFriend}>
//               <MsgFriend key={index} name={friend.name} profilePic={friend.profilePic} isActive={friend.id === activeFriend}
//               />
//             </div>
//           ))
//         )}
//         </div>
//       </div>
//       <div className={styles.messageInputCont}>
//         <div className={styles.messageContainer} ref={messageContainerRef}>
//           {messages.map((message, index) => (
//             <div key={index} className={`${styles.message} ${message.sender === 'You' ? styles.outgoing : styles.inbound}`}>
//               <div className={styles.sender}>{message.sender}</div>
//               <div className={styles.text}>{message.text}</div>
//             </div>
//           ))}
//         </div>
//         <div className={styles.inputContainer}>
//           <input
//             type="text"
//             placeholder="Type your message..."
//             className={styles.input}
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//           />
//           <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
//         </div>
//       </div>
//     </div>

//   );
// }


"use client" 
import React, { useState, useEffect, useRef } from 'react';
import MsgFriend from '../components/msgFriend';
import styles from './Messages.module.css';
import ReactLoading from 'react-loading';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { auth } from "../firebase/config";
// import { Router } from '@/node_modules/next/router';

interface Friend {
  major: string;
  name: string;
  year: string;
  id: string;
  profilePic: string;
}

export default function Messages() {
  // State to manage the input message
  const [inputMessage, setInputMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const[username,setUsername]= useState(auth.currentUser ? auth.currentUser.email : null);
  const[secret,setSecret]= useState(auth.currentUser ? auth.currentUser.uid : null);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const ChatEngine = dynamic(() =>
    import("react-chat-engine").then((module) => module.ChatEngine)
  );
  const MessageFormSocial = dynamic(() =>
    import("react-chat-engine").then((module) => module.MessageFormSocial)
  );


  const filteredFriends = friends.filter((friend: Friend) =>
    (friend.name && friend.name.toLowerCase().includes(searchKeyword.toLowerCase()))
  );  

  return (
    <div className={styles.container}>
      <ChatEngine className={styles.chat}
        height="calc(100vh - 212px)"
        projectID="PUT YOUR PROJECT ID HERE"
        userName={username}
        userSecret={secret}
        offset={-6}
        renderNewMessageForm={() => <MessageFormSocial />}
      />
    </div>
  );
}