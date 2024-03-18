"use client"
import { useState, useEffect, KeyboardEvent  } from 'react';
import Field from "../components/field";
import Button from "../components/button";
import Dropdown from '../components/dropdownField'
import CheckboxField from '../components/checkboxField'
import {Card, CardBody, CardHeader, Image, Slider} from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Header from '../components/Header';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NewPost() {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');

    const [description, setDescription] = useState('');
    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = () => {
        // Handle form submission
    };


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
                <div className="flex flex-col justify-middle items-center py-10 w-11/12 flex-1 bg-green rounded-xl">
                    <div className='flex flex-row p-12 w-11/12'>
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
                        </div>
                        <div className='flex'>
                            {/* imge */}
                        </div>
                    </div>
                    <div className='flex w-full px-24'>
                        <Field
                            labelName="Description"
                            fieldType="text"
                            fieldValue={description}
                            onChange={setDescription}
                            placeholderText="Enter a brief description of your event"
                            className='w-full'
                            />
                    </div>
                    <div className='flex flex-row'>
                        <div>
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
                                className="tags-input flex-grow mt-2"
                                placeholder="Type something"
                            />
                        </div>
                        <div>
                            <Button buttonText="Submit" onClick={() => router.push('/')} />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};
