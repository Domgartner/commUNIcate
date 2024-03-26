"use client"
import { useState, useEffect, KeyboardEvent  } from 'react';
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
    const [tagInput, setTagInput] = useState<string>('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const userEmail = auth.currentUser ? auth.currentUser.email : null;
    const userID = auth.currentUser ? auth.currentUser.uid : null;

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('user-email', userEmail || '');
            formData.append('title', title);
            formData.append('date', date);
            formData.append('location', location);
            formData.append('capacity', capacity);
            formData.append('description', description);

            if (selectedFile) {
                console.log(selectedFile + "it worked");
                formData.append('file', selectedFile);
            } else {
                console.log("no")
            }
            formData.append('id', uuid());

            tags.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag);
            });

            console.log(selectedFile)
            console.log(userEmail)
            console.log(userID)
            
    
            const response = await fetch('https://tgk4hztzlqjftfj3lfvlj6asou0seqyu.lambda-url.ca-central-1.on.aws/', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                // Handle successful response
                console.log('Form submitted successfully');
            } else {
                // Handle error response
                console.error('Failed to submit form:', response.statusText);
            }
            router.push('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

  const [file, setFile] = useState()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
        setSelectedFile(event.target.files[0]);
        console.log("hi")
        console.log(selectedFile)
    }
}

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
                    <div className='flex flex-col w-11/12 bg-green rounded-xl'>
                        <div className='flex flex-row p-12 w-11/12 justify-between'>
                            <div className="flex flex-col bg-light-cream rounded-xl">
                                    <h1 className='font-serif text-2xl font-normal'>Create your own event posting!</h1>
                                    <p>Please fill out the following information:</p>
                                    <Field
                                    labelName="Title"
                                    fieldType="text"
                                    fieldValue={title}
                                    onChange={setTitle}
                                    placeholderText="Enter your event name"
                                    className='w-60'
                                    />
                                    <Field
                                    labelName="Date"
                                    fieldType="text"
                                    fieldValue={date}
                                    onChange={setDate}
                                    placeholderText="Enter your event Date"
                                    className='w-60'
                                    />
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
                                <Button buttonText="Submit" onClick={handleSubmit} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    );
};
