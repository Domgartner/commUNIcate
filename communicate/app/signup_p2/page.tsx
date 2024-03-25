"use client"
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';
import { auth } from "../firebase/config";
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function SignUpP2() {
    // const { user } = UserAuth(); // Call UserAuth as a function to get the context value
    // const userID = user?.uid; // Retrieve the UID from the user object
    
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfMajor, setYearOfMajor] = useState('');
    const [image, setImage] = useState(null); // State to store the image file

    const handleImageChange = (e:any) => {
        // Function to handle image upload
        const file = e.target.files[0]; // Get the first file from the selected files
        setImage(file); // Set the image file to the state
    };
    const router = useRouter();
    async function handleSubmit() {
        // Function to handle form submission
        // Check if all fields are completed
        const userID = auth.currentUser ? auth.currentUser.uid : null; // Get userID from currentUser
        if (name.trim() === '' || major === '' || yearOfMajor === '') {
            alert("Please fill in all fields before submitting.");
            return; // Exit early if any field is empty
        }
        const data = {
            userID: userID,
            name: name,
            major: major,
            yearOfMajor: yearOfMajor,
            // profilePic: image 
        };
        // If all fields are filled, proceed with submission
        console.log("Submitting form...");
        console.log("Name:", name);
        console.log("Major:", major);
        console.log("Year of Major:", yearOfMajor);
        console.log("Profile Image:", image);
        console.log("UID:", userID);
        console.log("logged in");
        // Make the HTTP request to the Lambda function
        try {
            const response = await fetch('https://c4nfv7nqc3qf7ilrub4awh6nmy0beptt.lambda-url.ca-central-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to submit user info');
            }
            const responseData = await response.json();
            console.log('Response Data:', responseData); // Log the response data
            createProfile();
        } catch (error) {
            console.error('Error submitting user info:', error);
        }

        
    };

    const createProfile = async () => {
        const secret = auth.currentUser ? auth.currentUser.uid : null; // Get userID from currentUser
        const username = auth.currentUser ? auth.currentUser.email : null; // Get email from currentUser
        console.log("Name:", name);
        console.log("pass:", secret);
        console.log(image);
        if (name.length === 0) {
            return;
        }
        try {
            axios.put('https://api.chatengine.io/users/',{username: username, secret: secret},{headers:{"Private-key": 'c618201a-ee8b-480a-9bab-e8679963d52d'}}
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
                            onChange={(e) => handleImageChange(e)}
                            className="mt-1"
                        />
                    </div>
                    {/* Display the selected image */}
                    {image && (
                        <div>
                            <img src={URL.createObjectURL(image)} alt="Selected" className="mt-2 w-24 h-24 rounded-full object-cover" />
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
                        onClick={handleSubmit}
                    >
                        Done!
                    </button>
                </div>
            </div>
        </div>
    );
}
