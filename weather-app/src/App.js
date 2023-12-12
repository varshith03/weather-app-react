// src/App.js
import React, { useState } from 'react';
import './App.css';
import InputPart from './components/InputPart';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const searchWeather = (city) => {
    setPending(true);
    setError('');

    // Read the API key from the environment variable
    const apiKey = process.env.REACT_APP_API_KEY;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === '404') {
          setError(`${city} isn't a valid city name`);
        } else {
          setWeatherData({
            city: result.name,
            country: result.sys.country,
            description: result.weather[0].description,
            id: result.weather[0].id,
            temp: result.main.temp,
            feels_like: result.main.feels_like,
            humidity: result.main.humidity,
          });
        }
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setPending(false);
      });
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = process.env.REACT_APP_API_KEY;

          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          fetch(apiUrl)
            .then((res) => res.json())
            .then((result) => {
              setWeatherData({
                city: result.name,
                country: result.sys.country,
                description: result.weather[0].description,
                id: result.weather[0].id,
                temp: result.main.temp,
                feels_like: result.main.feels_like,
                humidity: result.main.humidity,
              });
            })
            .catch(() => {
              setError('Something went wrong');
            })
            .finally(() => {
              setPending(false);
            });
        },
        () => {
          setError('Your browser does not support geolocation');
        }
      );
    } else {
      setError('Your browser does not support geolocation');
    }
  };

  const resetWeatherData = () => {
    setWeatherData(null);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          {weatherData ? (
            <i className="bx bx-left-arrow-alt" onClick={resetWeatherData}></i>
          ) : (
            'Weather App'
          )}
        </header>
        {weatherData ? (
          <WeatherDetails weatherData={weatherData} onBackClick={resetWeatherData} />
          
        ) : (
          <InputPart
            onSearch={searchWeather}
            onLocationClick={getLocationWeather}
            error={error}
            pending={pending}
          />
        )}
      </div>
    </div>
  );
}

export default App;
