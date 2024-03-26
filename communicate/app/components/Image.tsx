'use client'
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Button from "./button";
import { auth } from "../firebase/config";

type PhotoBlockProps = {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  description: string;
  users: string[]; // List of users who have RSVPed
};

const PhotoBlock = ({ id, users, image, title, location, date, description }: PhotoBlockProps) => {
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const userEmail = auth.currentUser ? auth.currentUser.email : null;
  const hasRSVPed = users.includes(userEmail || '');

  const handleRSVP = async () => {
    setRsvpLoading(true);
    console.log(userEmail);
    console.log(id);

    try {
      const formData = new FormData();
      formData.append('user-email', userEmail || '');
      formData.append('id', id);
      const response = await fetch('https://hlcq5tpwxlvttjbpyp7kbrtgie0owhes.lambda-url.ca-central-1.on.aws/', {
        method: 'POST',
        body: formData,
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error RSVPing:', error);
    } finally {
      setRsvpLoading(false);
    }
  };


  const handleUnregister = async () => {
    setRsvpLoading(true);
    console.log(userEmail);
    console.log(id);

    try {
      const formData = new FormData();
      formData.append('user-email', userEmail || '');
      formData.append('id', id);
      const response = await fetch('https://m5wwpa6fpmpolcd4paopucghyy0dlpya.lambda-url.ca-central-1.on.aws/', {
        method: 'POST',
        body: formData,
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error RSVPing:', error);
    } finally {
      setRsvpLoading(false);
    }
  };

  return (
    <div>
      <Link href={""}>
        <div className="flex flex-col group relative rounded-xl">
          <img
            src={image}
            alt={description}
            className="cursor-pointer rounded-xl"
            style={{ width: '100%', height: 'auto' }}
          />
          <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white font-bold">
            <h1 className="text-white">{description}</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-around bg-beige py-5">
              <div className="flex-5 justify-items-center flex-col">
                <div className="flex">
                  <h1 className="text-blue">{date}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-xl font-bold">18</h1>
                </div>
              </div>
              <div className="flex-2 justify-items-center flex-col">
                <div className="flex">
                  <h1 className="text-xl font-bold">{title}</h1>
                </div>
                <div className="flex pt-1">
                  <h2 className="text-gray">{location}</h2>
                </div>
              </div>
            </div>
            <div>
              {hasRSVPed ? (
                <Button buttonText="Unregister" onClick={handleUnregister} />
              ) : (
                <Button buttonText="RSVP" onClick={handleRSVP} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PhotoBlock;
