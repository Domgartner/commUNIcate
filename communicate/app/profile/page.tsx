"use client"
import styles from './Profile.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import Header from '../components/Header';
import NavBar from '../components/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react'; // Import ChangeEvent type
import { available_majors } from './majors'; 


export default function Profile() {
    const [user, loading] = useAuthState(auth);
    
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in');
        }
    }, [user, loading, router]);
    const [isChanged, setIsChanged] = useState(false);
    const [year, setYear] = useState(1);
    const [major, setMajor] = useState("");
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");


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
        if (!name.trim()) {
            alert("Name cannot be empty");
            return;
        }
    
        setIsChanged(false);
        try {
            const data = {
                name: name,
                year: year,
                major: major,
                profilePic: imageUrl 
            };
    
            const userID = localStorage.getItem('userID');
    
            const queryParams = new URLSearchParams();
            queryParams.append('userID', userID);
            queryParams.append('type', 'update');
            queryParams.append('name', name);
            queryParams.append('year', year);
            queryParams.append('major', major);
            let url = 'https://ct9o7580ma.execute-api.ca-central-1.amazonaws.com/default/update-profile?' + queryParams.toString()
                // const response = await fetch(url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:imageUrl
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
                console.log('Fetching profile for '+ localStorage.getItem('userID'));
                const userID = localStorage.getItem('userID');
                // let userID = auth.currentUser ? auth.currentUser.uid : null;
                if (!userID) {
                    throw new Error('User ID not found in localStorage');
                }
                const queryParams = new URLSearchParams();
                queryParams.append('userID', userID);
                queryParams.append('type', 'get');
                let url = 'https://ct9o7580ma.execute-api.ca-central-1.amazonaws.com/default/update-profile?' + queryParams.toString()
                // const response = await fetch(url);
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

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
                    <div className="content">
                        <div className="md:container md:mx-auto h-full flex items-center justify-center">
                            <div className="bg-white rounded-2xl bg-neutral-100 shadow-2xl shadow-slate-600 p-8 w-1/3 relative h-3/4 min-w-[35rem] min-h-96 max-h-full mx-auto">
                                <div className="flex items-center justify-center mb-4 relative -left-5">
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
                                        <option value="">Select Year</option>
                                        {Array.from({ length: 7 }, (_, i) => i + 1).map((val) => (
                                            <option key={val} value={val}>{val}th</option>
                                        ))}
                                    </select>
                                    <span> Year </span> 
                                    <select
                                        className={`text-base text-gray-500 border-b border-gray-300 focus:outline-none focus:border-black appearance-none bg-transparent ${styles.select}`}
                                        onChange={(e) => setMajor(e.target.value)} value={major}
                                    >
                                        <option value="">Select Major</option>
                                        {available_majors.map((major) => (
                                            <option key={major} value={major}>{major}</option>
                                        ))}
                                    </select>
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
