//import { hasUnreliableEmptyValue } from '@testing-library/user-event/dist/utils'
import React, { useEffect, useState, useCallback } from "react";
import Weathercard from "./Weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("kathmandu");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = useCallback(async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=589effbff10c3b00f84ae441f730d24c`;
      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]);
  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
