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
      setUpcomingItems({ ...upcomingItems, [className]: [] }); 
      setSelectedClass(className);
    }
  };

  const handleClassRemove = () => {
    const updatedSelectedClasses = selectedClasses.filter(
      (className) => className !== selectedClass
    );

    const updatedUpcomingItems = { ...upcomingItems };
    delete updatedUpcomingItems[selectedClass ? selectedClass : 0];

    setSelectedClasses(updatedSelectedClasses);
    setUpcomingItems(updatedUpcomingItems);

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
    setSelectedDate(null); 
  };

  const handleDeleteItem = (className: string, index: number) => {
    const updatedItems = [...upcomingItems[className]];
    updatedItems.splice(index, 1); 
    setUpcomingItems({
      ...upcomingItems,
      [className]: updatedItems,
    });
  };

  const events = Object.values(upcomingItems)
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map((item) => ({
      title: item.title,
      start: item.date,
      end: item.date, 
    }));

  useEffect(() => {
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
            <div className="content pl-5">
              <div className="flex items-center border-b-2 border-line pb-2">
                <button
                  className="plusButton px-8 py-4 text-2xl border-r-2 border-line hover:bg-green rounded"
                  onClick={handlePlusButtonClick}
                >
                  +
                </button>
                {selectedClasses.map((className, index) => (
                  <text
                    key={index}
                    className="textlol px-10 py-4 hover:bg-green rounded"
                    onClick={() => handleSelectedClassClick(className)}
                  >
                    {className}
                  </text>
                ))}
              </div>
              {isClassListVisible && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-cream bg-opacity-70 z-10">
                  <div className="popupContainer rounded w-80 h-200 bg-green px-2">
                    <div className="popupContent">
                      <div className="flex items-center py-4 border-b-2">
                        <button
                          className="mr-2 px-4 py-2 hover:bg-light-green rounded"
                          onClick={handlePlusButtonExitClick}
                        >
                          x
                        </button>
                        <p>Software Engineer Class List</p>
                      </div>
                      <p
                        className="hover:bg-light-green rounded"
                        onClick={() => handleClassClick("ENSF 480")}
                      >
                        ENSF 480
                      </p>
                      <p
                        className="hover:bg-light-green rounded"
                        onClick={() => handleClassClick("ENSF 461")}
                      >
                        ENSF 461
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("ENSF 462")}>
                        ENSF 462
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("ENCM 460")}>
                        ENCM 460
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("ENSF 400")}>
                        ENSF 400
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("ENSF 444")}>
                        ENSF 444
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("SENG 401")}>
                        SENG 401
                      </p>
                      <p className="hover:bg-light-green rounded" onClick={() => handleClassClick("SENG 438")}>
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
                        <div className="bg-olive bg-opacity-20 p-4 rounded-lg mb-4 h-96 shadow-lg">
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
                                      className="ml-auto bg-light-green hover:bg-green text-xs py-2 px-2 rounded w-8 shadow-lg"
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
                            className="bg-olive hover:bg-light-green w-40 h-10 rounded shadow-lg"
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
                        events={events} 
                        startAccessor="start"
                        endAccessor="end"
                        views={["month"]} 
                        defaultView="month" 
                      />
                    </div>
                    <div className="flex justify-end pt-10">
                      <button
                        className="bg-olive hover:bg-light-green rounded w-40 h-10 shadow"
                        onClick={() => handleClassRemove()}
                      >
                        Remove Class
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isPopupVisible && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-cream bg-opacity-70 z-10">
                  <div className="popupContainer rounded w-80 h-200 bg-green px-2">
                    <div className="popupContent">
                      <div className="flex items-center py-4 border-b-2">
                        <button
                          className="mr-2 px-4 py-2 hover:bg-light-green rounded"
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
                        <div className="pt-4">
                          <button
                            className="bg-olive hover:bg-light-green h-10 w-20 rounded"
                            onClick={handleAddUpcomingItem}
                          >
                            Add
                          </button>
                        </div>
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
