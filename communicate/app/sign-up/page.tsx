"use client"
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const [error, setError] = useState('');

    const router = useRouter();


    const handleSignUp = async () => {
        if (!validateEmail(email)) {
            setError('Invalid email format!');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and contain at least one special character and one number.');
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log({ res });
            setEmail('');
            setPassword('');
            setError('')

            router.push('/signup_p2')

        } catch (e) {
            console.error(e);
            setError('Error signing up. Please try again.');
        }
    }

    const validateEmail = (email: string) => {
        // Regular expression pattern for email validation
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const validatePassword = (password: string) => {
        // Check if password length is at least 8 characters
        if (password.length < 8) {
            return false;
        }
    
        // Check if password contains at least one special character
        const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (!specialCharacters.test(password)) {
            return false;
        }
    
        // Check if password contains at least one number
        const number = /\d/;
        if (!number.test(password)) {
            return false;
        }
    
        // Password meets all criteria
        return true;
    }

    const handleGoogleSignIn = async () => {
        try {
            const provider = new OAuthProvider('google.com')
            const auth = getAuth();
            await signInWithPopup(auth, provider);
            
            router.push('/signup_p2');

        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleSignIn = () => {
        router.push('/sign-in');
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
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
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                    <button
                        className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                        onClick={handleGoogleSignIn}
                    >
                        Sign Up with Google
                    </button>
                    <div className="text-center"> 
                        <span>Already Have an Account?</span>
                    </div>
                    <button
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>



                </div>
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
}
