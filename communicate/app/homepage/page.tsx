'use client'
import React, { useState, useEffect } from 'react';

import UpcomingEvents from "../components/upcomingEvents"
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import NavBar from '../components/SideBar';
import Header from '../components/Header';
import { auth } from '../firebase/config';

export default function HomePage() {

    const [user, loading] = useAuthState(auth);
    
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in');
        }
    }, [user, loading, router]);

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
