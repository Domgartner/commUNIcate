"use client"
import React, { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the sign-out icon
import { signOut } from 'firebase/auth'; // Import signOut function
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    const handleUserClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            router.push('/sign-in');
            console.log("Logged Out");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className={styles.headCont}>
            <div className={styles.bars}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <h1 className={styles.title}>
                Comm<span id={styles.red}>UNI</span>cate
            </h1>
            <div className={styles.user} onClick={handleUserClick}>
                <img src="/profiletest.png" className={styles.userImage} />
                {showDropdown && (
                    <div className={styles.dropdown}>
                        <p onClick={handleSignOut} >Log Out</p>
                    </div>
                )}
            </div>
        </div>
    );
}
