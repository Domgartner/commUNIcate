"use client"
import "../globals.css";
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Friend from "../components/Friend";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

export default function FriendsPage() {
    const [activeFilter, setActiveFilter] = useState('Following');
    const [friends, setFriends] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const router = useRouter();

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    async function fetchFriends() {
        try {
            let url = `-- ADD URL HERE -- /?filter=${activeFilter}`; 
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data
            const friendsData = responseData.data || []; // Access the 'data' key
            setFriends(friendsData);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    }
    
    useEffect(() => {
        fetchFriends();
    }, [activeFilter]); // Trigger fetch on activeFilter change

    const filteredFriends = friends.filter((friend) =>
        (friend.name && friend.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (friend.major && friend.major.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (friend.year && friend.year.toString().includes(searchKeyword.toLowerCase()))
    );

    return (
        <div className={styles.FriendsCont}>
            <div className={styles.head}>
                <div className={styles.SearchBar}>
                    <div className={styles.SearchIcon}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input type="text" placeholder="Search..." className={styles.Input} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                </div>
                <div className={styles.filter}>
                    <div className={`${styles.followingBtn} ${activeFilter === 'Following' ? styles.active : ''}`} onClick={() => handleFilterClick('Following')}>
                        Following
                    </div>
                    <div className={`${styles.DiscoverBtn} ${activeFilter === 'Discover' ? styles.active : ''}`} onClick={() => handleFilterClick('Discover')}>
                        Discover
                    </div>
                </div>
                <div className={styles.total}>Total: {filteredFriends.length}</div>
            </div>
            <div className={styles.friendsArea}>
                {filteredFriends.map((friend, index) => (
                    <Friend
                        key={index}
                        id={friend.id}
                        name={friend.name}
                        profilePic={friend.profilePic}
                        major={friend.major}
                        year={friend.year}
                        activeFilter = {activeFilter}
                        fetchFriends = {fetchFriends}
                    />
                ))}
            </div>
        </div>
    );
}