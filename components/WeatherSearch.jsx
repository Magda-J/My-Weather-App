import React, { useState, useEffect } from 'react';

const WeatherSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Fetch suggestions based on the input
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=YOUR_API_KEY`
      );
      const data = await response.json();

      // Extract city names and coordinates from the API response
      const cities = data.map((city) => ({
        name: city.name,
        lat: city.lat,
        lon: city.lon,
      }));
      setSuggestions(cities);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleCitySelection = (selectedCity) => {
    setSelectedCity(selectedCity);
    // Fetch weather data for the selected city
    fetchWeatherData(selectedCity);
  };

  const fetchWeatherData = async (city) => {
    try {
      // Use the OpenWeather One Call API to fetch weather data for the selected city
      const response = await fetch(
       

        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
      );
      const weatherData = await response.json();

      // Display the weather data as needed
      console.log(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <input
      className="text-black ml-20"
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((city, index) => (
          <li key={index} onClick={() => handleCitySelection(city)}>
            {city.name}
          </li>
        ))}
      </ul>
      {selectedCity && (
        <div>
          <h2>Weather for {selectedCity.name}</h2>
          {/* Display weather information here */}
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;