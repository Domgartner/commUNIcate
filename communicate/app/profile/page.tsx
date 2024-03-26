"use client"
import styles from './Profile.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { ChangeEvent } from 'react'; // Import ChangeEvent type
import NavBar from '../components/SideBar';
import Header from '../components/Header';


export default function Profile() {
    const [isChanged, setIsChanged] = useState(false);
    const [year, setYear] = useState(1);
    const [major, setMajor] = useState("");
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // const handleImageChange = (e:any) => {
    //     const file = e.target.files[0]; // Get the selected file
    //     const imageUrl = URL.createObjectURL(file); // Convert the file to a URL
    //     setImageUrl(imageUrl); // Update the state with the image URL
    // };
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
        setImageUrl(imageUrl);
    };
    const handleYearChange = (e: { target: { name: any; value: any; }; }) => {
        setIsChanged(true);
        const { value } = e.target;
        const yearNumber = parseInt(value); // Extract the numeric part
        setYear(yearNumber);
        console.log(yearNumber);
    };

    useEffect(() => {
        setIsChanged(true);
    }, [year, major, name]);

    async function handleSave() {
        setIsChanged(false);
        try {
            const data = {
                name: name,
                year: year,
                major: major,
                profilePic: imageUrl
            };

            const userID = localStorage.getItem('userID');
            let url = `https://jle7exdim25dy7yrsd2pqqxnha0lwsgu.lambda-url.ca-central-1.on.aws/?type=${"update"}&userID=${userID}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            const responseData = await response.json();
            console.log('Profile updated successfully:', responseData);

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Fetching profile for ' + localStorage.getItem('userID'));
                const userID = localStorage.getItem('userID');
                // let userID = auth.currentUser ? auth.currentUser.uid : null;
                if (!userID) {
                    throw new Error('User ID not found in localStorage');
                }
                let url = `https://jle7exdim25dy7yrsd2pqqxnha0lwsgu.lambda-url.ca-central-1.on.aws/?type=${"get"}&userID=${userID}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const responseData = await response.json();
                console.log("response data: ", responseData);
                setName(responseData.data.name);
                setYear(responseData.data.year);
                setMajor(responseData.data.major);
                setImageUrl(responseData.data.profilePic);
                console.log(responseData.data.profilePic)
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="navCont">
                <NavBar />
            </div>
            <div className="headContent">
                <div className="headCont">
                    <Header />
                </div>
                <div className="content">

                    <div className="md:container md:mx-auto h-full flex items-center justify-center">
                        <div className="bg-white rounded-2xl bg-neutral-100 shadow-2xl shadow-slate-600 p-8 w-1/3 relative h-3/4 min-w-[35rem] min-h-96 max-h-full mx-auto">
                            <div className="flex items-center justify-center mb-4 relative -left-5">
                                <div className="sticky top-0 right-96 transform translate-x-[17rem] -mt-52">
                                    <label htmlFor="image" className="bg-white rounded-full p-2 border border-black z-50 cursor-pointer px-3 hover:bg-gray-200">
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={(e) => handleFileInputChange(e)}
                                            className="hidden" // Hide the file input
                                        />
                                    </label>
                                </div>
                                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 overflow-hidden">
                                    <img className="w-60 h-60 rounded-full object-cover" src={imageUrl} alt="Profile" />
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <p className="text-2xl font-bold text-center mb-2">
                                    Name:
                                    <input type="text" value={name} className={`text-2xl font-normal text-gray-500 border-b border-gray-300 focus:outline-none focus:border-black ml-2 ${styles.text}`} onChange={(e) => setName(e.target.value)} />
                                </p>
                            </div>
                            <p className="text-base text-gray-500 text-center mb-2">
                                <select
                                    className={`text-base text-gray-500 border-b border-gray-300 focus:outline-none focus:border-black appearance-none bg-transparent ${styles.select}`}
                                    onChange={handleYearChange} name="year" value={year}
                                >
                                    <option value="1">1st</option>
                                    <option value="2">2nd</option>
                                    <option value="3">3rd</option>
                                    <option value="4">4th</option>
                                    <option value="5">5th</option>
                                    <option value="6">6th</option>
                                    <option value="7">7th</option>
                                </select>
                                <span> Year </span> <input type="text" value={major} className={`text-base text-gray-500 border-b border-gray-300 focus:outline-none focus:border-black ${styles.text}`} onChange={(e) => setMajor(e.target.value)} />
                            </p>
                            <div className="bg-white border border-black p-2 relative rounded-2xl mt-5">
                                <p className="absolute top-1 left-2 px-1 text-sm text-gray-500">Email:</p>
                                <p className="text-base text-gray-500 text-center mt-2">{localStorage.getItem('email')?.replace(/"/g, '') ?? 'Unknown'}</p>
                            </div>
                            {isChanged && (
                                <div className="absolute bottom-0 right-0 mb-4 mr-4">
                                    <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl cursor-pointer" onClick={handleSave} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            );
}