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

const getMonthName = (month: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1];
};

const getDay = (date: string): string => {
  const day = date.split('-')[2]; // Assuming date is in the format 'YYYY-MM-DD'
  return day;
};

const PhotoBlock = ({ id, users, image, title, location, date, description }: PhotoBlockProps) => {
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const userEmail = auth.currentUser ? auth.currentUser.email : null;
  const [hasRSVPed, setHasRSVPed] = useState(users.includes(userEmail || ''));

  const handleRSVP = async () => {
    setRsvpLoading(true);
    console.log(userEmail);
    console.log(id);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('email', userEmail || '');
      queryParams.append('id', id);
      let url = 'https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/register-user?' + queryParams.toString()
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    });
      // Handle response as needed
      setHasRSVPed(true); // Update RSVP status
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
      const queryParams = new URLSearchParams();
      queryParams.append('email', userEmail || '');
      queryParams.append('id', id);
      let url = 'https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/unregister-user?' + queryParams.toString()
      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
      // Handle response as needed
      setHasRSVPed(false); // Update RSVP status
    } catch (error) {
      console.error('Error RSVPing:', error);
    } finally {
      setRsvpLoading(false);
    }
  };
  return (
    <div className="shadow-md rounded-lg overflow-hidden group">
      <Link href={""}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={description}
            className="cursor-pointer"
            style={{ width: '100%', height: 'auto' }}
          />
        <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-normal text-lg leading-relaxed z-10 transition-opacity duration-300">
          <p className="">{description}</p>
        </div>

          <div className="absolute inset-0 bg-light-grey opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300 backdrop-filter backdrop-blur-sm"></div>
          <div className=" p-4 relative z-10 transition-opacity duration-300">
            <div className="flex-1 flex-row justify-around items-center mb-4 opacity-100 group-hover:opacity-0">
              <div className=" flex flex-col text-center">
                <h1 className="text-blue">{getMonthName(Number(date.split('-')[1]))}</h1>
                <h1 className="text-xl font-bold">{getDay(date)}</h1>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold">{title}</h1>
                <h2 className="text-gray">{location}</h2>
              </div>
            </div>
            <div className="opacity-100 flex justify-center">
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
