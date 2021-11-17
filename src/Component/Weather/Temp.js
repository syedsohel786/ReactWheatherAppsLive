// `https://api.openweathermap.org/data/2.5/weather?q=&appid=1768f590dea8cfce696505852f760d29`;

import React, { useState, useEffect} from 'react';
import Weathercard from './Weathercard';
import "./Style.css";


const Temp = () => {
    const [searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1768f590dea8cfce696505852f760d29`;

            let respons = await fetch(url);
            let data = await respons.json();

            const { temp, humidity, pressure } = data.main;
              const { main: weathermood } = data.weather[0];      //disturing with we changed weather name//
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

                         
            // console.log(temp);

            console.log(data);

        } catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);
    
     return (
        <>
          <div className="wrap">
              <div className="search">
                  <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm" value={searchValue} 
                  onChange = {(e) => setSearchValue(e.target.value)}/>
                  <button className="searchButton" onClick={getWeatherInfo} type="button"> search </button>

              </div>
              </div> 

              <Weathercard tempInfo={tempInfo} />
              
        </>
    )
}

export default Temp;
