"use client";

import Image from "next/image";
import NavBar from "../components/SideBar";
import Header from "../components/Header";
import Friend from "../components/Friend";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

export default function Classes() {
  const [isClassListVisible, setClassListVisible] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [upcomingItems, setUpcomingItems] = useState<{
    [key: string]: { title: string; date: Date }[];
  }>({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePlusButtonClick = () => {
    setClassListVisible(true);
  };

  const handlePlusButtonExitClick = () => {
    setClassListVisible(false);
  };

  const handleClassClick = (className: string) => {
    if (selectedClasses.length < 7 && !selectedClasses.includes(className)) {
      setSelectedClasses([...selectedClasses, className]);
      setUpcomingItems({ ...upcomingItems, [className]: [] }); // Initialize upcoming items array for the selected class
      setSelectedClass(className);
    }
  };

  const handleClassRemove = () => {
    // Filter out the selected class from selectedClasses
    const updatedSelectedClasses = selectedClasses.filter(
      (className) => className !== selectedClass
    );

    // Create a copy of upcomingItems and remove the selected class from it
    const updatedUpcomingItems = { ...upcomingItems };
    delete updatedUpcomingItems[selectedClass ? selectedClass : 0];

    // Update the state variables
    setSelectedClasses(updatedSelectedClasses);
    setUpcomingItems(updatedUpcomingItems);

    // Clear the selected class
    setSelectedClass(null);
  };

  const handleSelectedClassClick = (className: string) => {
    setSelectedClass(className);
  };

  const handleAddUpcomingItem = () => {
    setUpcomingItems({
      ...upcomingItems,
      [selectedClass!]: [
        ...upcomingItems[selectedClass!],
        { title: itemInput, date: selectedDate || new Date() },
      ],
    });
    setPopupVisible(false);
    setItemInput("");
    setSelectedDate(null); // Reset selected date after adding the item
  };

  const handleDeleteItem = (className: string, index: number) => {
    const updatedItems = [...upcomingItems[className]];
    updatedItems.splice(index, 1); // Remove the item at the specified index
    setUpcomingItems({
      ...upcomingItems,
      [className]: updatedItems,
    });
  };

  // Combine events from all classes into a single array
  const events = Object.values(upcomingItems)
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((item) => ({
      title: item.title,
      start: item.date,
      end: item.date, // Assuming each event lasts for one day
    }));

  useEffect(() => {
    // Whenever upcomingItems or selectedClasses change, update the events array
  }, [upcomingItems, selectedClasses]);

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="navCont">
            <NavBar />
          </div>
          <div className="headContent">
            <div className="headCont">
              <Header />
            </div>
            <div className="content">
              <div className="flex items-center border-b-2 border-gray pb-2">
                <button
                  className="plusButton px-8 py-4 text-2xl border-r-2 border-gray"
                  onClick={handlePlusButtonClick}
                >
                  +
                </button>
                {selectedClasses.map((className, index) => (
                  <text
                    key={index}
                    className="textlol px-10 py-4"
                    onClick={() => handleSelectedClassClick(className)}
                  >
                    {className}
                  </text>
                ))}
              </div>
              {isClassListVisible && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50 z-10">
                  <div className="popupContainer border-4 border-black rounded w-80 h-200 bg-white px-2">
                    <div className="popupContent">
                      <div className="flex items-center py-4 border-b-2">
                        <button
                          className="mr-2 px-4"
                          onClick={handlePlusButtonExitClick}
                        >
                          x
                        </button>
                        <p>Software Engineer Class List</p>
                      </div>
                      <p onClick={() => handleClassClick("ENSF 480")}>
                        ENSF 480
                      </p>
                      <p onClick={() => handleClassClick("ENSF 461")}>
                        ENSF 461
                      </p>
                      <p onClick={() => handleClassClick("ENSF 462")}>
                        ENSF 462
                      </p>
                      <p onClick={() => handleClassClick("ENCM 460")}>
                        ENCM 460
                      </p>
                      <p onClick={() => handleClassClick("ENSF 400")}>
                        ENSF 400
                      </p>
                      <p onClick={() => handleClassClick("ENSF 444")}>
                        ENSF 444
                      </p>
                      <p onClick={() => handleClassClick("SENG 401")}>
                        SENG 401
                      </p>
                      <p onClick={() => handleClassClick("SENG 438")}>
                        SENG 438
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!selectedClass && (
                <div className="text-2xl text-gray-300 flex justify-center pt-40">
                  No Classes Selected
                </div>
              )}
              {selectedClass && (
                <div className="content flex">
                  <div className="w-1/3 flex px-4">
                    <div className="mainContent justify-center items-center w-full">
                      <div className="flex justify-center items-center">
                        <p className="text-5xl mb-4 py-8">{selectedClass}</p>
                      </div>
                      <div>
                        <div className="bg-gray-200 p-4 rounded-lg mb-4 h-96 shadow-lg">
                          <div className="pt-0 pb-5 text-center">
                            <h2 className="text-lg">Upcoming</h2>
                          </div>
                          <div className="pl-6">
                            <ul>
                              {upcomingItems[selectedClass].map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="flex justify-between py-1"
                                  >
                                    {item.title}
                                    <button
                                      onClick={() =>
                                        handleDeleteItem(selectedClass, index)
                                      }
                                      className="ml-auto bg-green-200 hover:bg-green-300 text-xs text-green-800 py-2 px-2 rounded w-8 shadow-lg"
                                    >
                                      &#x2713;
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            className="bg-green-200 w-40 h-10 rounded shadow-lg"
                            onClick={() => setPopupVisible(true)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="flex justify-end underline ">
                      <text>63 Members</text> {/*Finish This Part! */}
                    </div>
                    <div style={{ height: 600 }} className="p-8">
                      <Calendar
                        localizer={localizer}
                        events={events} // Add your events data here if needed
                        startAccessor="start"
                        endAccessor="end"
                        views={["month"]} // Only show the month view
                        defaultView="month" // Set the default view to month
                      />
                    </div>
                    <div className="flex justify-end pt-10">
                      <button
                        className="bg-red-100 rounded w-40 h-10"
                        onClick={() => handleClassRemove()}
                      >
                        Remove Class
                      </button>{" "}
                      {/*Finish This Part! */}
                    </div>
                  </div>
                </div>
              )}
              {isPopupVisible && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50 z-10">
                  <div className="popupContainer border-4 border-black rounded w-80 h-200 bg-white px-2">
                    <div className="popupContent">
                      <div className="flex items-center py-4 border-b-2">
                        <button
                          className="mr-2 px-4"
                          onClick={() => setPopupVisible(false)}
                        >
                          x
                        </button>
                        <p>Add Upcoming</p>
                      </div>
                      <div className="p-4 flex flex-col">
                        <text>Event/Task Title</text>
                        <input
                          className="border border-gray-300 border-2 rounded-md"
                          type="text"
                          value={itemInput}
                          onChange={(e) => setItemInput(e.target.value)}
                        />
                        <text className="pt-2">Date/Due Date</text>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date | null) =>
                            setSelectedDate(date)
                          }
                          className="border border-gray-300 border-2 rounded-md p-2"
                        />
                        <button onClick={handleAddUpcomingItem}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
