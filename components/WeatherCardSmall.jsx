"use client";

import React, { useState } from 'react';
import { Info, ChevronUpCircle  } from 'lucide-react';

const WeatherCardSmall = ({ icon, temp, description, temp_min, temp_max, wind_speed, timezone }) => {

  const [showDetails, setShowDetails] = useState(false);

  
  const getFormattedDate = (timestamp) => {
    console.log("Timestamp from API:", timestamp); // Log the timestamp to the console
  
    const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  
   const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
    return (
     
      <div>
      
        <div  className="card  lg:w-3/4 columns-4  mx-auto pb-3  bg-gradient-to-b from-cyan-50 to-blue-100 shadow-lg mt-3">
          <div className="mt-3 ml-4 col-span-1 gap-0">
          <div className="flex">

    <div className="mx-auto my-auto"><h2 className="card-date whitespace-nowrap text-sm md:text-base w-30 md:w-40">{getFormattedDate(timezone)} </h2></div>
    <div className="mx-auto my-auto">{icon && (
              <img
                src={`https://openweathermap.org/img/w/${icon}.png`}
                alt="Weather Icon"
                className="w-16 h-16 mx-auto "
              />
              
            )}</div>
    <div className="mx-auto my-auto"><p className="font-bold"> {temp}°C</p></div>
    <div className="mx-auto my-auto p-2"><button
              className={`btn ${showDetails ? 'box-shadow-md inset-shadow-md bg-orange-500 text-white hover:bg-orange-700' : ' box-shadow-md inset-shadow-md bg-green-500 hover:bg-green-700 text-white'}`}
              onClick={handleToggleDetails}
            >
              {showDetails ? <ChevronUpCircle/> : <Info />}
            </button></div>

    </div>
            
            
            
  
            {/* Additional details, conditionally rendered based on showDetails state */}
            <div className="gap-0">


            {showDetails && (
  <div>
    <p className="whitespace-normal p-4 text-center font-bold leading-tight">Weather:</p>
    <p className="whitespace-normal p-4 text-center leading-tight">{description}</p>
    <div className="whitespace-normal grid grid-cols-3 gap-4 ">
      <div>
        <p className="whitespace-normal p-4 text-center font-bold leading-tight">Max Temp:</p>
        <p className="whitespace-normal p-4 text-center leading-tight">{temp_max}°C</p>
      </div>
      <div>
        <p className="whitespace-normal p-4 text-center font-bold leading-tight">Min Temp:</p>
        <p className="p-4 text-center leading-tight">{temp_min}°C</p>
      </div>
      <div>
        <p className="whitespace-normal p-4 text-center font-bold leading-tight">Wind Speed:</p>
        <p className="whitespace-normal p-4 text-center leading-tight">{wind_speed}m/s</p>
      </div>
    </div>
  </div>
)}
</div>
  
            {/* Show/Hide more information button always at the bottom */}
            
          </div>
        </div>
      </div>
     
    );
  };
  
  export default WeatherCardSmall;