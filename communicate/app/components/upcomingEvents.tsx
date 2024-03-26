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
  image_url: string;
  title: string;
  location: string;
  date: string;
  description: string;
};

const upcomingEvents = () => {
    const router = useRouter();
    const [tag, setTag] = useState("");
    const [events, setEvents] = useState<Event[]>([]);

    const handleNavItemClick = (navItemId: any) => {
        router.push(`/${navItemId}`);
      };


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('https://fpwya4ojfnycyejef3y7v7567q0scycr.lambda-url.ca-central-1.on.aws/');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvents();
    }, []);


    useEffect(() => {
      console.log(events);
    }, [events]);

    const buildPhotoBlocks = (events : Event[]) => {
      let items = [];
      for (let index = 0; index < 3; index++) {
        items.push(
          <div key={index} className="flex flex-col justify-start mx-2 my-2 gap-4 rounded-md">
            {events
              .filter((event, idx) => idx % 3 === index)
              .map((filteredPhoto) => (
                <PhotoBlock
                  image={filteredPhoto.image_url}
                  title={filteredPhoto.title}
                  location={filteredPhoto.location}
                  date={filteredPhoto.date}
                  description={filteredPhoto.description}
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
            {buildPhotoBlocks(events)}
          </div>
      </div>
    );
  };
  
  export default upcomingEvents;