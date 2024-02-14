"use client"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import NavBar from '../components/SideBar';
import Header from '../components/Header';

export default function HomePage() {

    const [user] = useAuthState(auth);
    
    const router = useRouter();

    if(!user) {
        router.push('/sign-up')
    }

    return (
    <div>
        welcome to home
    <button onClick={() => signOut(auth)}> Log Out</button>
    <NavBar/>
    <Header/>
    </div>
    )

};
