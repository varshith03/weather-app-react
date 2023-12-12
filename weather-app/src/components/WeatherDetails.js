import React from 'react';

const WeatherDetails = ({ weatherData, onBackClick }) => {
    console.log('WeatherData:', weatherData);
  const { city, country, description, id, temp, feels_like, humidity } = weatherData;

  const getWeatherIcon = (weatherId) => {
    if (weatherId === 800) {
      return './icons/clear.svg';
    } else if (weatherId >= 200 && weatherId <= 232) {
      return './icons/storm.svg';
    } else if (weatherId >= 600 && weatherId <= 622) {
      return './icons/snow.svg';
    } else if (weatherId >= 701 && weatherId <= 781) {
      return './icons/haze.svg';
    } else if (weatherId >= 801 && weatherId <= 804) {
      return './icons/cloud.svg';
    } else if ((weatherId >= 500 && weatherId <= 531) || (weatherId >= 300 && weatherId <= 321)) {
      return './icons/rain.svg';
    } else {
      // Default placeholder icon if no match is found
      return './icons/placeholder.png';
    } 
  };

  return (
    <div>
      <header>
      <img
        src="./icons/left-arrow.png" 
        alt="Left Arrow"
        className="custom-arrow"
        onClick={onBackClick}
      />
        Weather App
      </header>
      <section className="weather-part">
        <img src={getWeatherIcon(id)} alt="Weather Icon" />
        <div className="temp">
          <span className="numb">{Math.floor(temp)}</span>
          <span className="deg">°</span>C
        </div>
        <div className="weather">{description}</div>
        <div className="location">
          <i className="bx bx-map"></i>
          <span>{`${weatherData.city}, ${country}`}</span>
        </div>
        <div className="bottom-details">
          <div className="column feels">
            <i className="bx bxs-thermometer"></i>
            <div className="details">
              <div className="temp">
                <span className="numb-2">{Math.floor(feels_like)}</span>
                <span className="deg">°</span>C
              </div>
              <p>Feels like</p>
            </div>
          </div>
          <div className="column humidity">
            <i className="bx bxs-droplet-half"></i>
            <div className="details">
              <span>{`${humidity}%`}</span>
              <p>Humidity</p> 
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
  
};

export default WeatherDetails;
