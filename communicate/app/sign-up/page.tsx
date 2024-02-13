"use client"
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);


    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log({res});
            setEmail('');
            setPassword('');
        } catch (e){
            console.error(e);
        }
    }

    return  (
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
                </div>
            </div>
        </div>
    );
}