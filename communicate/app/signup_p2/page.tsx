"use client"
import { useState } from "react";
import { UserAuth } from '../context/AuthContext';

export default function SignUpP2() {
    const { user } = UserAuth(); // Call UserAuth as a function to get the context value
    const userUid = user?.uid; // Retrieve the UID from the user object
    
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfMajor, setYearOfMajor] = useState('');
    const [image, setImage] = useState(null); // State to store the image file

    const handleImageChange = (e) => {
        // Function to handle image upload
        const file = e.target.files[0]; // Get the first file from the selected files
        setImage(file); // Set the image file to the state
    };

    const handleSubmit = () => {
        // Function to handle form submission
        // Check if all fields are completed
        if (name.trim() === '' || major === '' || yearOfMajor === '') {
            alert("Please fill in all fields before submitting.");
            return; // Exit early if any field is empty
        }

        const data = {
            userID: userUid,
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

        // Make the HTTP request to the Lambda function
        fetch('YOUR_LAMBDA_FUNCTION_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            return response.json();
        })
        .then(data => {
            console.log('Form submitted successfully:', data);
            // Optionally, you can perform any additional actions here
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            // Optionally, you can handle errors here
        });
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
                            onChange={handleImageChange}
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
                        <option value="4+">4+</option>
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
