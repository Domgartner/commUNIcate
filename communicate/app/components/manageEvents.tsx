'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import Field from './field';
import Line from './line';
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";

type Event = {
  id: string; // Add id field to uniquely identify each event
  image_url: string;
  email: string;
  title: string;
  location: string;
  date: string;
  capacity: string;
  description: string;
  registered: string;
  tags: string[];
  users: string[];
};

type PhotoBlockProps = {
  id: string; // Add id field to uniquely identify each event
  image_url: string;
  email: string;
  title: string;
  location: string;
  date: string;
  capacity: string;
  description: string;
  registered: string;
  tags: string[];
  users: string[];
};

const PhotoBlock = ({ image_url, id, title, location, date, capacity, description, registered, tags, users }: PhotoBlockProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedLocation, setEditedLocation] = useState(location);
    const [editedDate, setEditedDate] = useState(date);
    const [editedDescription, setEditedDescription] = useState(description);
    const userEmail = auth.currentUser ? auth.currentUser.email : null;

  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
        const handleConfirmClick = async () => {
            try {
              const email = auth.currentUser ? auth.currentUser.email : " " ; 
              const queryParams = new URLSearchParams();
              queryParams.append('email', "arminsandhuu@gmail.com");
              queryParams.append('id', id);
              queryParams.append('title', editedTitle);
              queryParams.append('date', editedDate);
              queryParams.append('location', editedLocation);
              queryParams.append('image_url', image_url);
              queryParams.append('capacity', capacity);
              queryParams.append('description', description);
              queryParams.append('registered', registered);
              queryParams.append('tags', tags.join(',')); // Convert tags array to comma-separated string
              queryParams.append('users', users.join(',')); // Convert users array to comma-separated string

              let url = 'https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/update-event?' + queryParams.toString()

              const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
                if (response.ok) {
                    // Handle successful response
                    console.log('Form submitted successfully');
                } else {
                    // Handle error response
                    console.error('Failed to submit form:', response.statusText);
                }
                setIsEditing(false);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
    
      
    };

    const handleDeleteClick = async () => { 
        const answer = window.confirm("Are you sure?");
        if (answer) {
          const queryParams = new URLSearchParams();
          queryParams.append('id', id);
          queryParams.append('email', userEmail || '');
          let url = 'https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/delete-event?' + queryParams.toString()
          const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok) {
            // Handle successful response
            console.log('Form submitted successfully');
            // Reload the window
            window.location.reload();

        } else {
            // Handle error response
            console.error('Failed to submit form:', res.statusText);
        }
      }
    }
  
    return (
      <div className="flex group relative rounded-xl border p-4">
        <div className=" mr-4">
          <img
            src={image_url}
            alt={description}
            className="cursor-pointer rounded-md object-cover"
            style={{ width: '250px', height: '250px' }}
          />
        </div>
        <div>
          <div className="font-bold">
            <h1 className="text-white">DESCRIPTION:  
              {isEditing ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <span>{description}</span>
              )}
            </h1>
          </div>
          <div className="flex flex-col py-5">
            <div className="flex justify-items-center flex-col">
              <div className="flex">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDate}
                    onChange={(e) => setEditedDate(e.target.value)}
                  />
                ) : (
                  <h1 className="text-blue">DATE: {editedDate}</h1>
                )}
              </div>
            </div>
            <div className="flex justify-items-center flex-col">
              <div className="flex">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                ) : (
                  <h1 className="text-xl font-bold">TITLE: {editedTitle}</h1>
                )}
              </div>
              <div className="flex pt-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                ) : (
                  <h2 className="text-gray">LOCATION: {editedLocation}</h2>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className='flex flex-col'>
              <button
                className="bg-green-500 text-white text-xl rounded-md p-2 shadow cursor-pointer"
                onClick={handleDeleteClick}
              >
                <FontAwesomeIcon icon={faCheck} /> Delete
              </button>
              <button
                className="bg-green-500 text-white text-xl rounded-md p-2 shadow cursor-pointer mt-2"
                onClick={handleConfirmClick}
              >
                <FontAwesomeIcon icon={faCheck} /> Confirm
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white text-xl rounded-md p-2 shadow cursor-pointer mt-2"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          )}
        </div>
      </div>
    );
    
    
};

const upcomingEvents = () => {
  const router = useRouter();
  const [tag, setTag] = useState("");
  const userEmail = auth.currentUser ? auth.currentUser.email : null;
  const userID = auth.currentUser ? auth.currentUser.uid : null;
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State to manage selected event for editing

  const handleNavItemClick = (navItemId: any) => {
    router.push(`/${navItemId}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/get-events?');
        const data = await response.json();
        const filteredEvents = data.filter((event: Event) => event.email === userEmail);
        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [userEmail]);


  const buildPhotoBlocks = (events: Event[]) => {
    let items = [];
    for (let index = 0; index < events.length; index++) { // Loop over all events
      const event = events[index];
      items.push(
        <div key={event.id} className="flex flex-col justify-start mx-2 my-2 gap-4 rounded-md">
          <PhotoBlock
            id={event.id}
            image_url={event.image_url}
            title={event.title}
            location={event.location}
            date={event.date}
            description={event.description}
            capacity={event.capacity}
            email={event.email}
            registered={event.registered}
            tags={event.tags}
            users={event.users}
          />
          {index !== events.length - 1 && <Line />} 
        </div>
      );
    }
    return items;
  }

  return (
    <div>
      <div className="flex my-2 pl-10">
      </div>
      <div className='flex flex-row py-2 px-12'>
        <h1 className="font-bold text-3xl pt-2">Manage My Events</h1>
      </div>
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-4 mt-5 mx-10"> {/* Changed grid layout to one column */}
        {buildPhotoBlocks(events)}
      </div>
      <button className="fixed bottom-8 right-8 bg-blue-500 text-white text-4xl rounded-md p-4 shadow-lg cursor-pointer z-10" onClick={() => handleNavItemClick('new-post')}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      </div>
    );
  };
  
  export default upcomingEvents;