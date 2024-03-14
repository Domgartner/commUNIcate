"use client"
import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup, faMessage, faGraduationCap, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
// config.autoAddCss = false; /* eslint-disable import/first */

export default function NavBar() {
    const router = useRouter();
    const [activeNavItem, setActiveNavItem] = useState(() => {
        // Retrieve the activeNavItem from local storage if it exists
        return localStorage.getItem('activeNavItem') || null;
    });

    useEffect(() => {
        // Save the activeNavItem to local storage whenever it changes
        localStorage.setItem('activeNavItem', activeNavItem);
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
            {/* <div className={`${styles.navItem} ${activeNavItem === 'profile' && styles.active}`} id={styles.profile} onClick={() => handleNavItemClick('profile')}>
                <FontAwesomeIcon icon={faUser} className={styles.logoIcon}/>
                <h3>Profile</h3>
            </div> */}

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

            {/* <div className={styles.navItemPost} id={styles.newPost} onClick={() => handleNavItemClick('new-post')}>
                <FontAwesomeIcon icon={faSquarePlus} className={styles.logoAdd}/>
            </div> */}
        </div>
    );
}