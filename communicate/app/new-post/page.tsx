"use client"
import { useState, useEffect, ChangeEvent  } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Field from "../components/field";
import Button from "../components/button";
import Dropdown from '../components/dropdownField'
import CheckboxField from '../components/checkboxField'
import {Card, CardBody, CardHeader, Image, Slider} from "@nextui-org/react";
import Link from 'next/link';
import uuid from 'react-uuid';
import { useRouter } from 'next/navigation'
import Header from '../components/Header';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from "../firebase/config";

export default function NewPost() {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const userEmail = auth.currentUser ? auth.currentUser.email : null;
    const userID = auth.currentUser ? auth.currentUser.uid : null;
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [image, setImage] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setFormValid(
            title.trim() !== '' &&
            date.trim() !== '' &&
            location.trim() !== '' &&
            capacity.trim() !== '' &&
            description.trim() !== '' &&
            tags.length > 0
        );
    }, [title, date, location, capacity, description, tags]);

    const handleSubmit = async () => {
        if (!formValid) {
            alert("Name cannot be empty");
            return;
        }
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('email', userEmail || '');
            queryParams.append('id', uuid());
            queryParams.append('title', title);
            queryParams.append('date', date);
            queryParams.append('location', location);
            queryParams.append('capacity', capacity);
            queryParams.append('description', description);


            // Append the base64-encoded file content as a query parameter
            queryParams.append('tags', tags.join(',')); // Convert tags array to comma-separated string
            queryParams.append('users', users.join(',')); // Convert users array to comma-separated string

            console.log(selectedFile)
            console.log(userEmail)
            console.log(userID)
        
    
            let url = 'https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/create-event?' + queryParams.toString()
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: image
            });
    
            if (response.ok) {
                // Handle successful response
                console.log('Form submitted successfully');
            } else {
                // Handle error response
                console.error('Failed to submit form:', response.statusText);
            }
            router.push('/homepage');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDateChange = (date: Date | [Date, Date] | null) => {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
            const day = date.getDate().toString().padStart(2, '0');
            setDate(`${year}-${month}-${day}`);
        }
    };


    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        
        const file = event.target.files[0];
        setSelectedFile(file);
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
        setImage(imageUrl);
    };

useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);



    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          const newTag = tagInput.trim();
          if (newTag) {
            setTags([...tags, newTag]);
            setTagInput('');
          }
        }
      };
    
      const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
      };

    return (
        <body className="flex flex-row h-full">
            <div className="flex-1% ">
                <NavBar/>
            </div>
            <div className="flex-4 flex-grow flex-col">
                <div>
                    <Header/>
                </div>
                <div className="flex flex-col justify-middle items-center py-10 w-full flex-1">
                    <div className='flex flex-col w-11/12 bg-light-grey rounded-xl'>
                        <div className='flex flex-row p-12 w-11/12 justify-between'>
                            <div className="flex flex-col bg-light-cream rounded-xl">
                                    <h1 className='font-montserrat text-2xl font-normal'>Create your own event posting!</h1>
                                    <p>Please fill out the following information:</p>
                                    <Field
                                    labelName="Title"
                                    fieldType="text"
                                    fieldValue={title}
                                    onChange={setTitle}
                                    placeholderText="Enter your event name"
                                    className='w-60'
                                    />
                                    <div className="flex flex-col w-60">
                                        <label className="block text-sm font-medium text-gray-900">Date</label>
                                        <DatePicker
                                            selected={date ? new Date(date) : null}
                                            onChange={handleDateChange}
                                            placeholderText='Enter your event date'
                                            dateFormat="MMMM d, yyyy"
                                            className="w-60 relative mt-1 rounded-md block w-full pl-4 rounded-xl border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <Field
                                    labelName="Location"
                                    fieldType="text"
                                    fieldValue={location}
                                    onChange={setLocation}
                                    placeholderText="Enter the location of your event"
                                    className='w-60'
                                    />
                                    <Field
                                    labelName="Capacity"
                                    fieldType="text"
                                    fieldValue={capacity}
                                    onChange={setCapacity}
                                    placeholderText="Enter the capacity of your event"
                                    className='w-60'
                                    />
                            </div>
                            <div className='flex'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload">
                                    <div className="relative rounded-md bg-gray-200 cursor-pointer w-72 h-72 flex items-center justify-center">
                                        {selectedFile ? (
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Selected File"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-500">Upload Image</span>
                                        )}
                                        <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 cursor-pointer" onClick={() => setSelectedFile(null)} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='flex w-11/12 px-12'>
                            <Field
                                labelName="Description"
                                fieldType="text"
                                fieldValue={description}
                                onChange={setDescription}
                                placeholderText="Enter a brief description of your event"
                                className='w-full'
                                />
                        </div>
                        <div className='flex flex-row w-11/12 justify justify-between px-12 py-3'>
                            <div className="flex">
                                <div className='flex flex-col'>
                                    <div>
                                        <h1>Add tags to your post!</h1>
                                    </div>
                                    <div className="tags-input-container flex flex-wrap">
                                        {tags.map((tag, index) => (
                                        <div className="tag-item" key={index}>
                                            <span className="text">{tag}</span>
                                            <span className="text-sm" onClick={() => removeTag(index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </div>
                                        ))}
                                    </div>
                                    <input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        type="text"
                                        className="tags-input flex-grow block w-full pl-4 rounded-xl border-0  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Type something"
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <button onClick={handleSubmit} >Submit</button>
                                {/* Display alert if form is not valid */}
                                {showAlert && (
                                    <div className="alert alert-danger" role="alert">
                                        Please fill in all fields before submitting.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    );
};