"use client";

import { useState, useEffect } from "react";

import { ApiClient } from "@/utils/ApiClient";

const SearchBar = ({ setWeatherData, handleClick, handleLanding }) => {
  const [searchText, setSearchText] = useState("");
  const [checkSearch, setCheckSearch] = useState(true);
  const [renderHistory, setRenderHistory] = useState(false);
  const [pressedEnter, setPressedEnter] = useState(false);
  const [pressedAutoFill, setPressedAutoFill] = useState(false);

  // API Client
  const apiClient = new ApiClient();

  // Update Text
  const handleSearchText = (event) => {
    const { value } = event.target;
    setSearchText(value);
    if (value.length === 0) {
      setRenderHistory(false);
      handleLanding(true);
      handleClick()
      return;
    }
    setRenderHistory(true);
  };

  // Clear Search
  const handleClearSearch = () => {
    setSearchText("");
    setRenderHistory(true);
    handleClick();
  };

  // Update local history with search history
  const updateSearchHistory = (capitalCity) => {
    const currentSearchHistory = localStorage.getItem("history");
    const localSearchHistory = currentSearchHistory
      ? JSON.parse(currentSearchHistory)
      : [];

    // Prevent duplicates
    if (!localSearchHistory.includes(capitalCity)) {
      const newHistory = [capitalCity, ...localSearchHistory];

      // Update local storage
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
  };

  // Entered nothing
  const searchEmpty = () => {
    setCheckSearch(false);

    setTimeout(() => {
      setCheckSearch(true);
    }, 2000);
  };

  // Handle Enter
  const handleSubmit = async (event) => {
    event?.preventDefault();

    if (searchText === "") {
      searchEmpty();
      return;
    }
    setSearchText(searchText);
    const capitalCity = searchText.replace(/\b\w/g, (match) => match.toUpperCase());

    // Make API Call
    const response = await apiClient.getRequest(capitalCity);

    if (response) {
      setWeatherData(response.daily);

      // Update search history + close search history
      updateSearchHistory(capitalCity);
      setRenderHistory(false);
      setPressedEnter(true);
    } else {
      setRenderHistory(false);
      searchEmpty();
    }

    handleLanding(false);
    setPressedEnter(false);
  };

  useEffect(() => {
    if (pressedAutoFill) {
      handleSubmit();
      setPressedAutoFill(false);
    }
  }, [searchText])

  return (
    <div className="w-2/5 h-10 mt-8 border border-blue-600 bg-red-200 rounded-lg z-10">
      {checkSearch && (
        <form
          id={"search-bar"}
          className="flex w-full h-full z-0 overflow-hidden rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleSearchText}
            value={searchText}
            className="font-semibold h-full w-4/5 text-center text-2xl outline-none bg-white"
            type="text"
            placeholder="Enter a city"
          />

          <div
            onClick={handleClearSearch}
            className="w-2/5 flex justify-center items-center hover:bg-red-600 border-lg bg-blue-400 h-full"
          >
            <p className="text-2xl text-white ">Clear</p>
          </div>
        </form>
      )}
      {!checkSearch && (
        <div className="flex w-full h-full bg-red-400 text-center items-center justify-center z-0 transition-500">
          <p className="text-white text-3xl font-semibold">
            Location doesn't exist
          </p>
        </div>
      )}

      {/* {renderHistory && (
        <SearchHistory
          setRenderHistory={setRenderHistory}
          setSearchText={setSearchText}
          pressedEnter={pressedEnter}
          setPressedAutoFill={setPressedAutoFill}
        />
      )} */}
    </div>
  );
};

export default SearchBar;