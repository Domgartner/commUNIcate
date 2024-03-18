'use client'
import Image from "next/image";
import React, { useState } from 'react';
import NavBar from "./components/SideBar";
import Header from "./components/Header";
import Friend from "./components/Friend";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Line from "./components/line";

import type { NextPage } from "next";
import Head from "next/head";
import { photos } from "./data/photo";
import PhotoBlock from "./components/Image";
import Field from "./components/field";
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

export default function Home() {
  const router = useRouter();
  const [tag, setTag] = useState("");

  const handleNavItemClick = (navItemId: any) => {
    router.push(`/${navItemId}`);
};
  return (
    <html lang="en">
      <body className="flex flex-row">
        <div className="flex-1% ">
          <NavBar/>
        </div>
        <div className="flex-4 flex-grow flex-col">
          <div>
            <Header/>
          </div>
          <div className="flex my-2 pl-10">
            <Field
            fieldType="text"
            fieldValue={tag}
            onChange={setTag}
            placeholderText="Enter a search tag"
          />

          </div>
          <Line />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5 mx-10">
            {buildPhotoBlocks()}
          </div>
          <button className="fixed bottom-8 right-8 bg-blue-500 text-white text-4xl rounded-md p-4 shadow-lg cursor-pointer z-10" onClick={() => handleNavItemClick('new-post')}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
          

      </body>
    </html>
  );
  }