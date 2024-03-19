"use client"
import { useState } from "react";

export default function SignUpP2() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [clubs, setClubs] = useState([]);
    const [bio, setBio] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null); // State to store the image file

    const clubOptions = [
        { id: 1, name: 'Code The Change' },
        { id: 2, name: 'Zoo' },
        { id: 3, name: 'Cool Kids Club' },
    ];

    const handleClubChange = (e) => {
        const selectedClubs = [...clubs];
        const clubId = parseInt(e.target.value);
        if (e.target.checked) {
            selectedClubs.push(clubId);
        } else {
            const index = selectedClubs.indexOf(clubId);
            if (index > -1) {
                selectedClubs.splice(index, 1);
            }
        }
        setClubs(selectedClubs);
    };

    const handleImageChange = (e) => {
        // Function to handle image upload
        const file = e.target.files[0]; // Get the first file from the selected files
        setImage(file); // Set the image file to the state
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
                <div className="space-y-4">
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
                    {/* First Name */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {/* Last Name */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {/* Major */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                    {/* Clubs */}
                    <div>
                        <label className="block font-medium text-gray-700">Clubs</label>
                        {clubOptions.map((club) => (
                            <div key={club.id} className="mt-1">
                                <input
                                    type="checkbox"
                                    id={`club-${club.id}`}
                                    value={club.id}
                                    checked={clubs.includes(club.id)}
                                    onChange={handleClubChange}
                                />
                                <label htmlFor={`club-${club.id}`} className="ml-2">{club.name}</label>
                            </div>
                        ))}
                    </div>
                    {/* Interests */}
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Simple Profile Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    {/* Gender */}
                    <div>
                        <label className="block font-medium text-gray-700">Pronouns/Gender</label>
                        <select
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="He/Him">He/Him</option>
                            <option value="She/Her">She/Her</option>
                            <option value="They/Them">They/Them</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

