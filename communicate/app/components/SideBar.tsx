"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import styles from "./Nav.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup, faMessage, faGraduationCap, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { library, config} from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/navigation';
// config.autoAddCss = false; /* eslint-disable import/first */

export default function NavBar() {
    const router = useRouter();
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    const handleLogoClick = () => {
        // Route to Home
        router.push("/")
    }

    const handleProfileClick = () => {
        // Route to Profile
        router.push("/Profile")
    }

    const handleFriendsClick = () => {
        // Route to Friends
        router.push("/friends")
    }

    const handleMessagesClick = () => {
        // Route to Messages
        router.push("/messages")
    }

    const handleClassesClick = () => {
        // Route to Classes
        router.push("/classes")
    }

    const handleNewPostClick = () => {
        // Route to Post Create
        router.push("/new-post")
    }

    return (
        <div className={styles.navCont}>
            <div className={styles.logo}>
                <img src="/logoTest.jpeg" className={styles.logoImg} onClick={handleLogoClick}/>
            </div>
            <div className={styles.navItem} id={styles.profile} onClick={handleProfileClick}>
                <FontAwesomeIcon icon={faUser} className={styles.logoIcon}/>
                <h3>Profile</h3>
            </div>

            <div className={styles.navItem} id={styles.friends} onClick={handleFriendsClick}>
                <FontAwesomeIcon icon={faUserGroup} className={styles.logoIcon}/>
                <h2>Friends</h2>
            </div>

            <div className={styles.navItem} id={styles.messages} onClick={handleMessagesClick}>
                <FontAwesomeIcon icon={faMessage} className={styles.logoIcon}/>
                <h3>Messages</h3>
            </div>

            <div className={styles.navItem} id={styles.classes} onClick={handleClassesClick}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.logoIcon}/>
                <h3>Classes</h3>
            </div>

            <div className={styles.navItemPost} id={styles.newPost} onClick={handleNewPostClick}>
                <FontAwesomeIcon icon={faSquarePlus} className={styles.logoAdd}/>
            </div>

        </div>
    );
}

