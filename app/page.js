"use client";
// Import necessary libraries
import { useState, useEffect } from "react";
import { ApiClient } from "@/utils/ApiClient";
import WeatherCard from "@/components/WeatherCard";

import WeatherCardSmall from "@/components/WeatherCardSmall";
import "../app/globals.css";

// addition
import SearchBar from '@/components/SearchBar'



// Your Home component
export default function Home() {
  const apiClient = new ApiClient();

  // addition
  const [weatherData, setWeatherData] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);


  // State to store weather data
  const [weather, setWeather] = useState({
    weekDay: "",
    location: "",
    description: "",
    temp: "",
    temp_min: "",
    temp_max: "",
    wind_speed: "",
    icon: "",
    daily: [], // MJ- addition Add a state for daily weather data
    timezone: "",
    timezone2: "",
  });

  // Function to fetch weather data
  const getThisWeekWeather = async () => {
    try {
      let response = await apiClient.getWeather(); // Ensure that your getWeather function fetches data from the correct endpoint

      console.log(response.data);

      // Modification added to setWeather
      setWeather((prevWeather) => ({
        ...prevWeather,
        location: response.data.body.timezone,
        description: response.data.body.current.weather[0].description,
        temp: response.data.body.current.temp,
        temp_min: response.data.body.daily[0].temp.min,
        temp_max: response.data.body.daily[0].temp.max,
        wind_speed: response.data.body.current.wind_speed,
        icon: response.data.body.current.weather[0].icon,
        daily: response.data.body.daily.slice(1, 6),
        timezone: response.data.body.daily.dt,
        timezone2: response.data.body.current.dt,
      }));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // useEffect to fetch weather data on component mount
  useEffect(() => {
    getThisWeekWeather();
  }, []);

  const handleXClick = () => {
    setWeatherData({});
    setSelectedDay(0);
  }


  // Display the weather information and image
  return (
    <main>
      <h1
        className="p-4 bg-clip-text font-bold bg-cover bg-no-repeat text-4xl md:text-7xl text-transparent text-center"
        style={{
          backgroundImage:
            "url('https://64.media.tumblr.com/f9550bbdc547c3e9710faa8f344e06a6/tumblr_p3jcwibaUs1wnoat1o1_640.gif')",
        }}
      >
        The <br/> Weather <br/>App
      </h1>
      <div className="text-black flex flex-wrap p-4">
        {/* CURRENT WEATHER CARD */}
        <div className="flex-1 w-full md:w-1/2">
          <WeatherCard
            location={weather?.location}
            description={weather?.description}
            temp={weather?.temp}
            temp_min={weather?.temp_min}
            temp_max={weather?.temp_max}
            icon={weather?.icon}
            wind_speed={weather?.wind_speed}
            daily={weather?.daily}
            timezone2={weather?.timezone2}
          />
        </div>

        {/* DAILY WEATHER CARDS */}
        <div className="flex-1 w-full  md:w-1/2 mt-3 md:mt-0">
          {weather.daily.map((day, index) => (

           <div key={index} className="mb-5">
            <WeatherCardSmall
              location={weather?.location}
              
              description={day?.weather[0]?.description}
              temp={day?.temp?.day}
              temp_min={day?.temp.min}
              temp_max={day?.temp.max}
              icon={day?.weather[0]?.icon}
              wind_speed={day?.wind_speed}
              timezone = {day?.dt}
            />
          
          </div>
          
          ))}
          </div>
        </div>

{/* addition */}
        <SearchBar setWeatherData={setWeatherData} handleClick={handleXClick} />

      </main>
      );
      }