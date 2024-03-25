"use client"
import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup, faMessage, faGraduationCap, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const router = useRouter();
    const [activeNavItem, setActiveNavItem] = useState(() => {
        // Check if localStorage is available before accessing it
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeNavItem') || 'homepage'; // Provide a default value if null
        }
        return 'homepage'; // Provide a default value if localStorage is not available
    });

    useEffect(() => {
        // Save the activeNavItem to local storage whenever it changes
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeNavItem', activeNavItem);
        }
    }, [activeNavItem]);
    
    const handleNavItemClick = (navItemId: any) => {
        setActiveNavItem(navItemId);
        router.push(`/${navItemId}`);
    };


    return (
        <div className={styles.navCont}>
            <div className={styles.logo}>
                <img src="/logoTest.jpeg" className={styles.logoImg} onClick={() => handleNavItemClick('homepage')}/>
            </div>
            <div className={`${styles.navItem} ${activeNavItem === 'profile' && styles.active}`} id={styles.profile} onClick={() => handleNavItemClick('profile')}>
                <FontAwesomeIcon icon={faUser} className={styles.logoIcon}/>
                <h3>Profile</h3>
            </div>

            <div className={`${styles.navItem} ${activeNavItem === 'friends' && styles.active}`} id={styles.friends} onClick={() => handleNavItemClick('friends')}>
                <FontAwesomeIcon icon={faUserGroup} className={styles.logoIcon}/>
                <h2>Friends</h2>
            </div>

            <div className={`${styles.navItem} ${activeNavItem === 'messages' && styles.active}`} id={styles.messages} onClick={() => handleNavItemClick('messages')}>
                <FontAwesomeIcon icon={faMessage} className={styles.logoIcon}/>
                <h3>Messages</h3>
            </div>

            <div className={`${styles.navItem} ${activeNavItem === 'classes' && styles.active}`} id={styles.classes} onClick={() => handleNavItemClick('classes')}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.logoIcon}/>
                <h3>Classes</h3>
            </div>

            <div className={styles.navItemPost} id={styles.newPost} onClick={() => handleNavItemClick('new-post')}>
                <FontAwesomeIcon icon={faSquarePlus} className={styles.logoAdd}/>
            </div>
        </div>
    );
}