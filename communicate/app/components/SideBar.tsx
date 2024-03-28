"use client";
import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";

import {
  faUser,
  faUserGroup,
  faMessage,
  faGraduationCap,
  faHome,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    const router = useRouter();
    const [activeNavItem, setActiveNavItem] = useState(() => {
        // Retrieve the activeNavItem from local storage if it exists
        // return localStorage.getItem('activeNavItem') || null;
    });

  // useEffect(() => {
  //     // Save the activeNavItem to local storage whenever it changes
  //     localStorage.setItem('activeNavItem', activeNavItem);
  // }, [activeNavItem]);

  const handleNavItemClick = (navItemId: any) => {
    setActiveNavItem(navItemId);
    router.push(`/${navItemId}`);
  };

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sidebar
      className="text-sans bg-bleh h-screen fixed left-0 right-0 "
      collapsed={collapsed}
    >
      <button
        className="flex px-8 text-3xl text-baby-blue pt-8"
        onClick={handleToggleSidebar}
      >
        <FontAwesomeIcon icon={faGripLines} />
      </button>
      <div className="flex flex-col items-star pt-20">
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.friends}
          onClick={() => handleNavItemClick("homepage")}
        >
          <FontAwesomeIcon
            icon={faHome}
            className="text-baby-blue text-md ml-9"
          />
          <h2 className=" text-baby-blue ml-10">Home</h2>
        </button>
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.friends}
          onClick={() => handleNavItemClick("manage-events")}
        >
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="text-baby-blue text-md ml-9"
          />
          <h2 className=" text-baby-blue ml-10">Manage Events</h2>
        </button>
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.friends}
          onClick={() => handleNavItemClick("friends")}
        >
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-baby-blue text-md ml-9"
          />
          <h2 className=" text-baby-blue ml-10">Friends</h2>
        </button>
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.messages}
          onClick={() => handleNavItemClick("messages")}
        >
          <FontAwesomeIcon
            icon={faMessage}
            className="text-baby-blue text-md ml-9"
          />
          <h3 className="text-baby-blue ml-11">Messages</h3>
        </button>
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.classes}
          onClick={() => handleNavItemClick("classes")}
        >
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-baby-blue text-md ml-9"
          />
          <h3 className="text-baby-blue ml-10">Classes</h3>
        </button>
        <button
          className="flex flex-row pt-5 pb-4 rounded-xl hover:bg-blue focus:outline-none focus:ring-4 focus:ring-blue-300"
          id={styles.classes}
          onClick={() => handleNavItemClick("profile")}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-baby-blue text-md ml-9"
          />
          <h3 className="text-baby-blue ml-10">Profile</h3>
        </button>
      </div>
    </Sidebar>
  );

  // return (
  //    <Sidebar collapsed={collapsed}>
  //      <div className={styles.navCont}>
  //         <div className={`${styles.navItem} ${activeNavItem === 'friends' && styles.active}`} id={styles.friends} onClick={() => handleNavItemClick('friends')}>
  //              <FontAwesomeIcon icon={faUserGroup} className={styles.logoIcon}/>
  //              <h2>Friends</h2>
  //          </div>

  //          <div className={`${styles.navItem} ${activeNavItem === 'messages' && styles.active}`} id={styles.messages} onClick={() => handleNavItemClick('messages')}>
  //              <FontAwesomeIcon icon={faMessage} className={styles.logoIcon}/>
  //              <h3>Messages</h3>
  //          </div>

  //          <div className={`${styles.navItem} ${activeNavItem === 'classes' && styles.active}`} id={styles.classes} onClick={() => handleNavItemClick('classes')}>
  //              <FontAwesomeIcon icon={faGraduationCap} className={styles.logoIcon}/>
  //              <h3>Classes</h3>
  //          </div>

  //      </div>
  //     </Sidebar>
  //   );
}
