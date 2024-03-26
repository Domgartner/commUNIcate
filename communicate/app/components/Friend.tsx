import styles from "./friend.module.css"

export default function Friend() {

    return (
        <div className={styles.friendContainer}>
            <div className={styles.profilepicCont}>
                <img src="/profiletest.png" className={styles.userImage} />
            </div>
            <div className={styles.friendInfo}>
                <div className={styles.mainInfo}>
                    <h2 className={styles.name}>Put Name Here</h2>
                    <p className={styles.major}>Software Engineering (3)</p>
                </div>

                <div className={styles.clubs}>
                    {/* Need to map clubs here from db */}
                </div>

                <div className={styles.buttons}>
                    <p className={styles.add}>Add</p>
                    <p className={styles.message}>Message</p>
                </div>

                
            </div>

        </div>
    );
};