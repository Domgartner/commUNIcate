'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { photos } from "../data/photo";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PhotoBlock from './Image';
import Field from './field';
import Line from './line';
import { useRouter } from "next/navigation";

type Event = {
  id: string
  image_url: string;
  title: string;
  location: string;
  date: string;
  description: string;
  tags: string[];
  users: string[]; // Include the rsvpedUsers property
};

const upcomingEvents = () => {
    const router = useRouter();
    const [tag, setTag] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    const handleNavItemClick = (navItemId: any) => {
        router.push(`/${navItemId}`);
      };


      useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://h2or2awj67.execute-api.ca-central-1.amazonaws.com/default/get-events?');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setEvents(data);
                    setFilteredEvents(data);
                } else {
                    console.error("Data fetched is not an array:", data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvents();
    }, []);


    useEffect(() => {
      if (tag.trim() === "") {
          setFilteredEvents(events);
      } else {
          const filtered = events.filter(event =>
              event.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
          );
          setFilteredEvents(filtered);
      }
  }, [tag, events]);


    const buildPhotoBlocks = (events : Event[]) => {
      let items = [];
      for (let index = 0; index < 3; index++) {
        items.push(
          <div key={index} className="flex flex-col justify-start mx-2 my-2 gap-4 rounded-md">
            {events
              .filter((event, idx) => idx % 3 === index)
              .map((filteredPhoto) => (
                <PhotoBlock
                  id={filteredPhoto.id}
                  image={filteredPhoto.image_url}
                  title={filteredPhoto.title}
                  location={filteredPhoto.location}
                  date={filteredPhoto.date}
                  description={filteredPhoto.description}
                  users={filteredPhoto.users}
                />
              ))}
          </div>
        );
      }
      return items;
    }

    return (
      <div>
          <div className="flex my-2 pl-10">
              <Field
              fieldType="text"
              fieldValue={tag}
              onChange={setTag}
              placeholderText="Enter a search tag"
              />
          </div>
          <Line />
          <div className='flex flex-row py-2 px-12'>
            <h1 className="font-bold text-3xl pt-2">Upcoming Events</h1>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5 mx-10">
            {buildPhotoBlocks(filteredEvents)}
          </div>
      </div>
    );
  };
  
  export default upcomingEvents;