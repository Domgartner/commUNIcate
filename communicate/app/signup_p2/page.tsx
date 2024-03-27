"use client"
import { useState, ChangeEvent, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { auth } from "../firebase/config";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";




export default function SignUpP2() {
    const [user, loading] = useAuthState(auth);
   
    const router = useRouter();


    // const actionCodeSettings = {
    //     // URL you want to redirect back to. The domain (www.example.com) for this
    //     // URL must be in the authorized domains list in the Firebase Console.
    //     url: 'http://localhost:3000/homepage',
    //     // This must be true.
    //     handleCodeInApp: true,
    //     iOS: {
    //       bundleId: 'com.example.ios'
    //     },
    //     android: {
    //       packageName: 'com.example.android',
    //       installApp: true,
    //       minimumVersion: '12'
    //     },
    //     dynamicLinkDomain: 'example.page.link'
    //   };


    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in');
        }
    }, [user, loading, router]);


    const CHAT_ENG_PK = process.env.NEXT_PUBLIC_CHAT_ENGINE_PK
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfMajor, setYearOfMajor] = useState('');
    const [image, setImage] = useState(null); // State to store the image file
    const [imageUrl, setImageUrl] = useState<string>('');


    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        
        const file = event.target.files[0];
        // Check if the selected file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Convert the image to black and white
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Canvas context is null.');
            return;
        }
        ctx.drawImage(bitmap, 0, 0);

        // Convert the canvas to a data URL and set it as the image URL
        const imageUrl = canvas.toDataURL();
        
        // const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg'
        // const imageUrl = canvas.toDataURL('image/jpeg', 0.01);
        setImageUrl(imageUrl);
    };
    
    async function handleSubmit() {
        // Function to handle form submission
        // Check if all fields are completed
        const userID = auth.currentUser ? auth.currentUser.uid : null; // Get userID from currentUser
        if (name.trim() === '' || major === '' || yearOfMajor === '') {
            alert("Please fill in all fields before submitting.");
            return; // Exit early if any field is empty
        }
        // If all fields are filled, proceed with submission
        console.log("Submitting form...");
        console.log("Name:", name);
        console.log("Major:", major);
        console.log("Year of Major:", yearOfMajor);
        console.log("Profile Image:", imageUrl);
        console.log("UID:", userID);
        const queryParams = new URLSearchParams();
        queryParams.append('userID', userID);
        queryParams.append('name', name);
        queryParams.append('major', major);
        queryParams.append('yearOfMajor', yearOfMajor);
        // Make the HTTP request to the Lambda function
        try {
            const response = await fetch('https://nw7q5lhwt1.execute-api.ca-central-1.amazonaws.com/default/register?' + queryParams.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: imageUrl
            });
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data
            createProfile();
            localStorage.setItem('userID', JSON.stringify(auth.currentUser.uid));
            localStorage.setItem('email', JSON.stringify(auth.currentUser.email));
            if (responseData.profilePic) {
                localStorage.setItem('profilePic', responseData.profilePic);
            }
        } catch (error) {
            console.error('Error submitting user info:', error);
        }
    };


    const createProfile = async () => {
        const secret = auth.currentUser ? auth.currentUser.uid : null; // Get userID from currentUser
        const username = auth.currentUser ? auth.currentUser.email : null
        console.log("Name:", name);
        console.log("pass:", secret);
        console.log(image);
        if (name.length === 0 ) {
            return;
        }
        if (!username) {
            console.error('Username not found');
            return;
        }
        try {
            // await sendSignInLinkToEmail(auth, username, actionCodeSettings);
            // window.localStorage.setItem('emailForSignIn', username);
            axios.put('https://api.chatengine.io/users/',{username: username, secret: secret},{headers:{"Private-key": CHAT_ENG_PK}}
            ).then((r:any) => router.push('/profile'));
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
                <div className="space-y-4">
                    {/* Profile Image */}
                    <div>
                        <label htmlFor="image" className="block font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => handleFileInputChange(e)}
                            className="mt-1"
                        />
                    </div>
                    {/* Display the selected image */}
                    {imageUrl && (
                        <div>
                            <img src={imageUrl} alt="Selected" className="mt-2 w-24 h-24 rounded-full object-cover" />
                        </div>
                    )}
                    {/* Name */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* Major */}
                    <select
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    >
                        <option value="">Select Major</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                    </select>
                    {/* Year of Major */}
                    <select
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={yearOfMajor}
                        onChange={(e) => setYearOfMajor(e.target.value)}
                    >
                        <option value="">Select Year of Major</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                    {/* Finished Button */}
                    <button
                        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        style={{ backgroundColor: '#4285F4' }} // Override button background color
                        onClick={handleSubmit}
                    >
                        Done!
                    </button>
                </div>
            </div>
        </div>
    );
}



