'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { photos } from "../data/photo";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PhotoBlock from './Image';
import Field from './field';
import Line from './line';
import { useRouter } from "next/navigation";


const buildPhotoBlocks = () => {
    let items = [];
    for (let index = 0; index < 3; index++) {
      items.push(
        <div key={index} className="flex flex-col justify-start mx-2 my-2 gap-4 rounded-md">
          {photos
            .filter((photo, idx) => idx % 3 === index)
            .map((filteredPhoto) => (
              <PhotoBlock
                key={filteredPhoto.id}
                image={filteredPhoto.src}
                link={filteredPhoto.link}
                height={filteredPhoto.height}
                heading={filteredPhoto.heading}
              />
            ))}
        </div>
      );
    }
    return items;
  }

const upcomingEvents = () => {
    const router = useRouter();
    const [tag, setTag] = useState("");

    const handleNavItemClick = (navItemId: any) => {
        router.push(`/${navItemId}`);
      };

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
            {buildPhotoBlocks()}
          </div>
          <button className="fixed bottom-8 right-8 bg-blue-500 text-white text-4xl rounded-md p-4 shadow-lg cursor-pointer z-10" onClick={() => handleNavItemClick('new-post')}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
      </div>
    );
  };
  
  export default upcomingEvents;