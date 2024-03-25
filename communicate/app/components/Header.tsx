"use client"
import React, { useState } from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the sign-out icon
import { signOut } from 'firebase/auth'; // Import signOut function
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Line from './line'

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
            <div className="flex flex-col">
                <div className="flex flex-row py-2 px-10 justify-between">
                    <h1 className="text-4xl py-2">Comm<span className="text-olive">UNI</span>cate</h1>
                    <button className='text-4xl pt-2' onClick={handleSignOut}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
                <Line />
            </div>
    );
}
