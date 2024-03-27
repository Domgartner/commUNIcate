"use client";
import Image from "next/image";
import NavBar from "../components/SideBar";
import Header from "../components/Header";
import Friend from "../components/Friend";
import { useState, useEffect, SetStateAction } from "react";
import { Calendar, momentLocalizer, EventPropGetter } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { available_classes } from "./classData";


const localizer = momentLocalizer(moment);


export default function Classes() {
 const [isClassListVisible, setClassListVisible] = useState(false);
 const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
 const [selectedClass, setSelectedClass] = useState<string | null>(null);
 const [upcomingItems, setUpcomingItems] = useState<{
   [key: string]: {
     id: string;
     title: string;
     date: Date;
     className: string;
   }[];
 }>({});
 const [isPopupVisible, setPopupVisible] = useState(false);
 const [itemInput, setItemInput] = useState("");
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);
 const [enrolledClasses, setEnrolledClasses] = useState<string[]>([]);
 const [searchQuery, setSearchQuery] = useState("");
 const colors = [
   "#A6AD8C",
   "#CCD5AE",
   "#E9EDC9",
   "#FEFAE0",
   "#FAEDCD",
   "#D4A373",
   "#b1b2b3",
 ];
 const index_class = selectedClasses.indexOf(selectedClass!);
 const color_class = colors[index_class % colors.length];


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


     // Enroll in class if not already enrolled
     if (!enrolledClasses.includes(className)) {
       enroll(className);
       setEnrolledClasses([...enrolledClasses, className]);
     }
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
   unEnroll();
 };


 const handleSelectedClassClick = (className: string) => {
   setSelectedClass(className);
 };


 const handleAddUpcomingItem = () => {
   const uniqueID = uuidv4();
   setUpcomingItems({
     ...upcomingItems,
     [selectedClass!]: [
       ...upcomingItems[selectedClass!],
       {
         id: uniqueID,
         title: itemInput,
         date: selectedDate || new Date(),
         className: selectedClass!,
       },
     ],
   });
   setPopupVisible(false);
   setItemInput("");
   setSelectedDate(null);
   addClassItem(uniqueID, itemInput, selectedDate);
 };


 const handleDeleteItem = (className: string, index: number) => {
   const updatedItems = [...upcomingItems[className]];
   const deletedItem = updatedItems.splice(index, 1)[0];
   updatedItems.splice(index, 1);
   setUpcomingItems({
     ...upcomingItems,
     [className]: updatedItems,
   });
   deleteClassItem(deletedItem.id, deletedItem.title, deletedItem.date);
 };


 const events = Object.values(upcomingItems)
   .reduce((acc, cur) => [...acc, ...cur], [])
   .map((item) => ({
     title: item.title,
     start: item.date,
     end: item.date,
     className: item.className,
   }));


 useEffect(() => {}, [upcomingItems, selectedClasses]);


 const handleSearchInputChange = (event: {
   target: { value: SetStateAction<string> };
 }) => {
   setSearchQuery(event.target.value);
 };


 const eventStyleGetter: EventPropGetter<any> = (
   event: { className: string; },
   start: any,
   end: any,
   isSelected: any
 ) => {
   // Find the index of the class in the selectedClasses array
   const index = selectedClasses.indexOf(event.className);

   // Get the color based on the index, looping back to the beginning if index exceeds the length of colors array
   const color = colors[index % colors.length];

   const style = {
     backgroundColor: color,
     color: "black",
     borderRadius: "0px",
     border: "none",
   };
   return {
     style,
   };
 };


 useEffect(() => {
  const timeout = setTimeout(() => {
    console.log("FETCHING IN USEFFECT");
    console.log(auth.currentUser);
    fetchClasses();
  }, 500);

  return () => clearTimeout(timeout);
}, []);




  async function deleteClassItem(uniqueID: string, itemInput: string, selectedDate: Date | null) {
    try {
      console.log('Adding item to class:', itemInput);
      console.log('Selected Date:', selectedDate);
      console.log('ID:', uniqueID);
      console.log('Class:', selectedClass);
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      const data = {
        userID: userID,
        className: selectedClass,
        date: selectedDate,
        id: uniqueID,
        itemName: itemInput
    };

    if (!selectedClass) {
      throw new Error("Selected class is null or undefined.");
    }

    // const dateString = selectedDate ? selectedDate.toISOString() : "";
    const queryParams = new URLSearchParams();
    queryParams.append('userID', userID);
    queryParams.append('id', uniqueID);
    // queryParams.append('date',dateString);
    queryParams.append('itemName',itemInput);
    queryParams.append('className',selectedClass);
    queryParams.append('type','delete');


    let url = 'https://9l8gwc1l3d.execute-api.ca-central-1.amazonaws.com/default/manage-class-items?' + queryParams.toString();
    // let url = `https://ahjyyh4enmm3q7dxpts6wafviy0xqwqy.lambda-url.ca-central-1.on.aws/?type=${"add"}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
      if (!response.ok) {
        throw new Error('Failed to delete class Item');
      }
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error deleting class Item:', error);
  }
}


  async function addClassItem(uniqueID: string, itemInput: string, selectedDate: Date | null) {
    try {
      console.log('Adding item to class:', itemInput);
      console.log('Selected Date:', selectedDate);
      console.log('ID:', uniqueID);
      console.log('Class:', selectedClass);
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      const data = {
        userID: userID,
        className: selectedClass,
        date: selectedDate,
        id: uniqueID,
        itemName: itemInput
    };

    if (!selectedClass) {
      throw new Error("Selected class is null or undefined.");
    }


      const dateString = selectedDate ? selectedDate.toISOString() : "";
      const queryParams = new URLSearchParams();
      queryParams.append('userID', userID);
      queryParams.append('id', uniqueID);
      queryParams.append('date',dateString);
      queryParams.append('itemName',itemInput);
      queryParams.append('className',selectedClass);
      queryParams.append('type','add');


      let url = 'https://9l8gwc1l3d.execute-api.ca-central-1.amazonaws.com/default/manage-class-items?' + queryParams.toString();

      const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
      if (!response.ok) {
        throw new Error('Failed to add class Item');
      }
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error adding class Item:', error);
  }
}


 // // Fetch all classes from the db that matches auth.currentUser.uid and put the results in setselectedClasses
  async function fetchClasses() {
    try {
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      console.log(userID);

      const queryParams = new URLSearchParams();
      queryParams.append('userID', userID);
      let url = 'https://9l8gwc1l3d.execute-api.ca-central-1.amazonaws.com/default/get-class?' + queryParams.toString();

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      let classesString = responseData.data.Items[0]?.classNames || '';
      console.log(responseData.data.Items[0]?.classNames);
      let classes = classesString.split(',');
      console.log(classes);
      const items = responseData.data.Items[0]?.items || [];
      console.log(typeof items); // Check the type of items

      const itemDetails = items.map((item: { itemName: any; date: any; id: any; class: any }) => ({
        title: item.itemName,
        date: item.date,
        id: item.id,
        className: item.class,
      }));
      console.log('Item Details:', itemDetails);
      classes = classes.filter((className: string) => className.trim() !== "LoserNoClasses");
      // const classNames = classes.map((className: string) => {
      //   handleClassClick(className.trim()); // Add the class to selectedClasses
      //   return className.trim();
      // });
      const classNames = classes.map((className: string) => {
        if (selectedClasses.length < 7 && !selectedClasses.includes(className)) {
          setSelectedClasses([...selectedClasses, className]);
          setUpcomingItems({ ...upcomingItems, [className]: [] });
        }
        return className.trim();
      });
      setSelectedClasses(classNames);
      
      // Initialize upcomingItems for each class with an empty array
      const upcomingItemsObj = classNames.reduce((acc: any, className: string) => {
        acc[className] = [];
        return acc;
      }, {});
      
      itemDetails.forEach((item: { id: any; title: any; date: any; className: any; }) => {
        const itemClass = item.className; // Use a different variable name here
        console.log('Class Name:', itemClass);
        if (upcomingItemsObj.hasOwnProperty(itemClass)) {
            upcomingItemsObj[itemClass].push(item);
        }
    });
    setUpcomingItems(upcomingItemsObj);
     localStorage.setItem('classes', JSON.stringify(classNames));
    localStorage.setItem('events', JSON.stringify(upcomingItemsObj));
    console.log('Upcoming Items:', upcomingItemsObj['MDPH 712']);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }


  async function unEnroll() {
      try {
        console.log('Enrolling in class:', selectedClass);
        console.log('User ID:', auth.currentUser.uid);
        const data = {
            class: selectedClass,
            userID: auth.currentUser.uid
        }
        if (!selectedClass) {
          throw new Error("Selected class is null or undefined.");
      }
  
        
        const queryParams = new URLSearchParams();
        queryParams.append('userID', auth.currentUser.uid);
        queryParams.append('class', selectedClass);
        queryParams.append('type','unenroll')
        
  
        let url = 'https://9l8gwc1l3d.execute-api.ca-central-1.amazonaws.com/default/class-enroll?' + queryParams.toString();
        // let url = `https://htd3uel2yernvl4wim2mjgompy0mdpik.lambda-url.ca-central-1.on.aws/?type=${"unenroll"}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
        if (!response.ok) {
            throw new Error('Failed to unenroll class');
        }
        const responseData = await response.json();
        console.log('Response Data:', responseData); // Log the response data
        const friendsData = responseData.data || []; // Access the 'data' key
      } catch (error) {
          console.error('Error unenrolling class:', error);
      }
  }


  async function enroll(className:string) {
    try {
        console.log("ENROLL FUNCTION CALLED");
        console.log('Enrolling in class:', className);
        console.log('User ID:', auth.currentUser.uid);

        const data = {
            class: className,
            userID: auth.currentUser.uid
        }
      //   if (!selectedClass) {
      //     throw new Error("Selected class is null or undefined.");
      // }
        const queryParams = new URLSearchParams();
        queryParams.append('userID', auth.currentUser.uid);
        queryParams.append('class', className);
        queryParams.append('type','enroll')
        
  
        let url = 'https://9l8gwc1l3d.execute-api.ca-central-1.amazonaws.com/default/class-enroll?' + queryParams.toString();
      
        const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
        if (!response.ok) {
            throw new Error('Failed to store class');
        }
        const responseData = await response.json();
        console.log('Response Data:', responseData); // Log the response data
        const friendsData = responseData.data || []; // Access the 'data' key
    } catch (error) {
        console.error('Error storing class:', error);
    }
}


 return (
  <div className="container">
            <div className="navCont">
                <NavBar />
            </div>
            <div className="headContent">
                <div className="headCont">
                    <Header />
                </div>
                <div className="content"></div>
   <div className="content pl-5">
     <div className="flex items-center border-b-2 border-line pb-2">
       <button
         className="plusButton px-8 py-4 text-2xl border-r-2 border-line hover:bg-green rounded"
         onClick={handlePlusButtonClick}
        >
         +
       </button>
       {selectedClasses.map((className, index) => (
         <p
           key={index}
           className="textlol px-10 py-4 hover:bg-green rounded"
           onClick={() => handleSelectedClassClick(className)}
         >
           {className}
         </p>
       ))}
     </div>
     {isClassListVisible && (
       <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-cream bg-opacity-70 z-10">
         <div className="popupContainer rounded w-80 h-80 overflow-y-auto bg-green px-2">
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
             {/* Search bar */}
             <input
               type="text"
               placeholder="Search..."
               className="w-full px-3 py-2 border rounded-md mb-4"
               onChange={handleSearchInputChange}
             />
             {/* Class list */}
             {available_classes
               .filter((className) =>
                 className.toLowerCase().includes(searchQuery.toLowerCase())
               )
               .map((className, index) => (
                 <p
                   key={index}
                   className="hover:bg-light-green rounded"
                   onClick={() => handleClassClick(className)}
                 >
                   {className}
                 </p>
               ))}
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
               <p
                 className="text-5xl mb-4 py-8"
                 style={{ borderBottom: `8px solid ${color_class}` }}
               >
                 {selectedClass}
               </p>
             </div>
             <div>
               <div className="bg-olive bg-opacity-20 p-4 rounded-lg mb-4 h-96 shadow-lg">
                 <div className="pt-0 pb-5 text-center">
                   <h2 className="text-lg">Upcoming</h2>
                 </div>
                 <div className="pl-6">
                   <ul>
                     {upcomingItems[selectedClass].map((item, index) => (
                       <li key={index} className="flex justify-between py-1">
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
                     ))}
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
           <div style={{ height: 600 }} className="p-8">
             <Calendar
               localizer={localizer}
               events={events}
               startAccessor="start"
               endAccessor="end"
               views={["month"]}
               defaultView="month"
               eventPropGetter={eventStyleGetter}
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
               <p>Event/Task Title</p>
               <input
                 className="border border-gray-300 border-2 rounded-md"
                 type="text"
                 value={itemInput}
                 onChange={(e) => setItemInput(e.target.value)}
               />
               <p className="pt-2">Date/Due Date</p>
               <DatePicker
                 selected={selectedDate}
                 onChange={(date: Date | null) => setSelectedDate(date)}
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
 );
}