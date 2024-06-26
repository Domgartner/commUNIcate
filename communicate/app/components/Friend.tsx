import styles from "./friend.module.css";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faComments, faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/config";

export default function Friend({ id, name, profilePic, major, year, activeFilter, fetchFriends }: { id: string; name: string; profilePic: string; major: string; year: string; activeFilter: string; fetchFriends: () => void }) {
    const router = useRouter();

    const handleMessageClick = () => {
        // router.push(`/messages/${id}`);
        router.push('messages');
    };

    async function handleAdd(id: string) {
        try {
            const userID = auth.currentUser ? auth.currentUser.uid : null;
            console.log(id);
            const response = await fetch(`https://6scorqyghakulyfm22dfsg4qgq0zwdpc.lambda-url.ca-central-1.on.aws/?id=${id}&userID=${userID}`);
            if (!response.ok) {
                throw new Error('Failed to add friend');
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data
            fetchFriends();
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }
    
    async function handleRemove(id: string) {
        try {
            const userID = auth.currentUser ? auth.currentUser.uid : null;
            console.log(id);
            const response = await fetch(`"https://6scorqyghakulyfm22dfsg4qgq0zwdpc.lambda-url.ca-central-1.on.aws/?id=${id}&userID=${userID}`);
            if (!response.ok) {
                throw new Error('Failed to remove friend');
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data
            fetchFriends();
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    }    

    return (
        <div className={styles.friendContainer} key={id}>
            <div className={styles.profilepicCont}>
                <img src={profilePic} alt={name} className={styles.userImage} />
            </div>
            <div className={styles.friendInfo}>
                <div className={styles.mainInfo}>
                    <h2 className={styles.name}><b>{name}</b></h2>
                    <p className={styles.major}>{major} ({year})</p>
                </div>
                <div className={styles.clubs}>
                    {/* Clubs information */}
                </div>
                <div className={styles.buttons}>
                    {activeFilter === 'Following' && <p className={styles.remove} onClick={() => handleRemove(id)}><FontAwesomeIcon icon={faTimes} className={styles.icon}/></p>}
                    {activeFilter === 'Discover' && <p className={styles.add} onClick={() => handleAdd(id)}><FontAwesomeIcon icon={faPlus} className={styles.icon}/></p>}
                    {activeFilter === 'Following' && <p className={styles.message} onClick={handleMessageClick}><FontAwesomeIcon icon={faComments} className={styles.icon}/></p>}
                </div>
            </div>
        </div>
    );
}
