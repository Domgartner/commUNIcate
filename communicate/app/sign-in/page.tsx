"use client"
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log(res);
            setEmail('');
            setPassword('');
            router.push('/profile');
        } catch (e){
            console.error(e);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const provider = new OAuthProvider('google.com');
            const authInstance = getAuth();
            await signInWithPopup(authInstance, provider);
            router.push('/homepage');
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSignUp = () => {
        router.push('/sign-up'); // Replace '/signup' with your actual sign-up page route
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign In</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                    <button
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                        onClick={handleGoogleSignIn}
                    >
                        Sign In with Google
                    </button>
                    <div className="text-center"> 
                        <span>Need to create an Account?</span>
                    </div>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
