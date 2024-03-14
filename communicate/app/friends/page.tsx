"use client"
import "../globals.css";
import styles from "./Friends.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import Friend from "../components/Friend";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

export default function FriendsPage() {
    const [activeFilter, setActiveFilter] = useState('Following');

    const handleFilterClick = (filter: any) => {
        setActiveFilter(filter);
    }

    // const [user] = useAuthState(auth);
    
    // const router = useRouter();

    // if(!user) {
    //     router.push('/sign-up')
    // }

    return(
        <div className={styles.FriendsCont}> 
            <div className={styles.head}>
                <div className={styles.SearchBar}>
                    <div className={styles.SearchIcon}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input type="text" placeholder="Search..." className={styles.Input}/>
                </div>
                <div className={styles.filter}>
                    <div  className={`${styles.followingBtn} ${activeFilter === 'Following' ? styles.active : ''}`} onClick={() => handleFilterClick('Following')} >
                        Following
                    </div>
                    <div className={`${styles.DiscoverBtn} ${activeFilter === 'Discover' ? styles.active : ''}`} onClick={() => handleFilterClick('Discover')} >
                        Discover
                    </div>
                </div>
                <div className={styles.total}>Total: 42</div>
            </div>

            <div className={styles.friendsArea}>
                <Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/><Friend/>
            </div>
        </div>
    );
}