"use client"
import styles from "./Header.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the sign-out icon
import { signOut } from 'firebase/auth'; // Import signOut function
import { auth } from '../firebase/config';

export default function Header() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className={styles.headCont}>
            <div className={styles.bars}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <h1 className={styles.title}>Comm<span id={styles.red}>UNI</span>cate</h1>
            <div className={styles.user}>
                <img src="/profiletest.png" className={styles.userImage} />
                {/* Placeholder user image */}
                <div className={styles.logoutButton} onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
            </div>
        </div>
    );
};
