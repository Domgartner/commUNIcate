"use client"
import "../globals.css";
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Friend from "../components/Friend";
import ReactLoading from 'react-loading';
import { auth } from "../firebase/config";
import NavBar from "../components/SideBar";
import Header from "../components/Header";

interface Friend {
    major: string;
    name: string;
    year: string;
    id: string;
    profilePic: string;
}

export default function FriendsPage() {
    const [activeFilter, setActiveFilter] = useState('Following');
    const [friends, setFriends] = useState<Friend[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFilterClick = (filter: any) => {
        setActiveFilter(filter);
    };

    async function fetchFriends() {
        setIsLoading(true);
        try {
            const userID = auth.currentUser ? auth.currentUser.uid : null; // Get userID from currentUser
            console.log(userID);
            let url = `https://dfqkiu5sgnquzd677b4j2zhm5i0bpwwo.lambda-url.ca-central-1.on.aws/?filter=${activeFilter}&userID=${userID}`;
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
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFriends();
    }, [activeFilter]); // Trigger fetch on activeFilter change

    const filteredFriends = friends.filter((friend: Friend) =>
        (friend.name && friend.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (friend.major && friend.major.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (friend.year && friend.year.toString().includes(searchKeyword.toLowerCase()))
    );

    return (
        <div className="container">
            <div className="navCont">
                <NavBar />
            </div>
            <div className="headContent">
                <div className="headCont">
                    <Header />
                </div>
                <div className="content">
                    <div className={styles.FriendsCont}>
                        <div className={styles.head}>
                            <div className={styles.SearchBar}>
                                <div className={styles.SearchIcon}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                                <input type="text" placeholder="Search..." className={styles.Input} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
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
                            {isLoading ? (
                                <div className={styles.loading}>
                                    <ReactLoading type={'spin'} color={'rgba(0, 0, 0, 1)'} height={50} width={50} />
                                </div>
                            ) : filteredFriends.length === 0 ? (
                                <div className={styles.noFriendsMessage}>
                                    {activeFilter === 'Following' ? "You have no Friends" : "No Friends to add"}
                                </div>
                            ) : (
                                filteredFriends.map((friend, index) => (
                                    <Friend
                                        key={index}
                                        id={friend.id}
                                        name={friend.name}
                                        profilePic={friend.profilePic}
                                        major={friend.major}
                                        year={friend.year}
                                        activeFilter={activeFilter}
                                        fetchFriends={fetchFriends}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}