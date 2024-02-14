import styles from "./Header.module.css"

export default function Header() {

    return (
        <div className={styles.headCont}>
            <h1 className={styles.title}>Comm<span id={styles.red}>UNI</span>cate</h1>
            <div className={styles.user}>
                <img src="/profiletest.png" className={styles.userImage} />
            </div>
        </div>
    );

};