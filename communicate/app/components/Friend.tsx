import styles from "./friend.module.css"
import { useRouter } from 'next/navigation';

export default function Friend() {
    const router = useRouter();

    // NEED TO FIX TO SET activeNavItem IN SIDEBAR TO MESSAGES
    const handleMessageClick = () => {
        router.push(`messages`);
    }
    return (
        <div className={styles.friendContainer}>
            <div className={styles.profilepicCont}>
                <img src="/profiletest.png" className={styles.userImage} />
            </div>
            <div className={styles.friendInfo}>
                <div className={styles.mainInfo}>
                    <h2 className={styles.name}><b>Put Name Here</b></h2>
                    <p className={styles.major}>Software Engineering (3)</p>
                </div>

                <div className={styles.clubs}>
                    {/* Need to map clubs here from db */}
                </div>

                <div className={styles.buttons}>
                    <p className={styles.add}>Add</p>
                    <p className={styles.message} onClick={handleMessageClick}>Message</p>
                </div>

                
            </div>

        </div>
    );
};