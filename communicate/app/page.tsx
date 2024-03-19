'use client'
import React, { useState } from 'react';
import NavBar from "./components/SideBar";
import Header from "./components/Header";
import UpcomingEvents from "./components/upcomingEvents"

export default function Home() {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <div className="flex-1% bg-gray-800">
          <NavBar/>
        </div>
        <div className="flex-4 flex-grow flex-col">
          <div>
            <Header/>
          </div>
          <div>
            <UpcomingEvents />
          </div>
        </div>
      </body>
    </html>
  );
  }