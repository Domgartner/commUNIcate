import styles from "./Header.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {

    return (
        <div className={styles.headCont}>
            <div className={styles.bars}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <h1 className={styles.title}>Comm<span id={styles.red}>UNI</span>cate</h1>
            <div className={styles.user}>
                <img src="/profiletest.png" className={styles.userImage} />
            </div>
        </div>
    );

};