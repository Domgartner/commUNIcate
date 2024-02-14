"use client"
import styles from "./BEvent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState } from "react";

export default function BEvent() {
    library.add(faBookmark, faComment)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setSaved(!saved);
    }

    const handleComment = () => {
        console.log("Comment");
    }

  return (
    <div className={styles.EventCont}>
      <div className={styles.backgroundImage} style={{backgroundImage: "url(/party.jpeg)"}}></div>
      <div className={styles.content}>
        <div className={styles.head}>
          <h2 id={styles.title}>Event Title</h2>
        </div>
        <span className={styles.save}>
            <FontAwesomeIcon icon={faBookmark} onClick={handleSave} className={saved ? styles.savedIcon : styles.icon}/>
        </span>
        <div className={styles.userPosted}>
          <img src="/profiletest.png" className={styles.userImage} />
          <h4>Jon Jones</h4>
        </div>

        <div className={styles.Info}>
          <p>
            <b>When: </b>CHANGE TO INPUT
          </p>
          <p>
            <b>Where: </b>CHANGE TO INPUT
          </p>
          <p className={styles.desc}>
            Description wefnuernfiuerf ernfiuernf eruner fhire fhier ihr hier erf reg rg
            erer erer er er ereii er ererer erere rere rerer
          </p>
          <span className={styles.comment}>
            <FontAwesomeIcon icon="fa-comment" className={styles.commentIcon} onClick={handleComment}/>
        </span>
        </div>
       
      </div>
    </div>
  );
}
