"use client"
import React, { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleUserClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        // Implement your logout logic here
        console.log("Logging out...");
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
                        <p onClick={handleLogout} >Log Out</p>
                    </div>
                )}
            </div>
        </div>
    );
}
