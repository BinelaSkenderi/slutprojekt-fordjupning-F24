import { getCityImage } from './api/unsplashAPI';
import { openWeatherApiKey } from './constants/APIkeys';
import { Weather } from './types/types';
import './style.scss';

// Get references to the input field, search button, and weather info containers
const cityInput = document.getElementById('city-input') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const weatherInfo = document.getElementById('weather-info') as HTMLElement;
const forecastWeatherInfo = document.getElementById('future-forecast') as HTMLElement; // New ID for 5-day forecast

// Fetch today's weather for a city
async function fetchWeather(cityName: string) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${openWeatherApiKey}`
        );
        if (!response.ok) throw new Error('City not found');
        const weatherData = (await response.json()) as Weather; // vraca objekt
        displayWeather(
            weatherData.name,
            weatherData.weather[0].description,
            weatherData.main.temp,
            weatherData.wind.speed
        );
        fetchFiveDayForecast(cityName); // Fetch 5-day forecast after today's weather
        getCityImage(cityName); // Optionally fetch an image based on the city
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = `<p>Could not find weather data for "${cityName}". Please try another city.</p>`;
    }
}

// Fetch 5-day forecast for a city
async function fetchFiveDayForecast(cityName: string) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${openWeatherApiKey}`
        );
        if (!response.ok) throw new Error('City not found');
        const forecastData = await response.json();// vraca lista
        displayFiveDayForecast(forecastData.list);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        forecastWeatherInfo.innerHTML = `<p>Could not find 5-day forecast for "${cityName}".</p>`;
    }
}

// Display today's weather on the page
function displayWeather(cityName: string, description: string, temperature: number, windSpeed: number) {
    weatherInfo.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <p>Description: ${description}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}

// Display 5-day forecast on the page
function displayFiveDayForecast(forecastList: any[]) {
    // Filter to get one forecast per day (e.g., the midday forecasts)
    const dailyForecasts = forecastList.filter((_, index) => index % 8 === 0); // OpenWeatherMap returns data every 3 hours

    //forecastWeatherInfo.innerHTML = '<h3>5-Day Forecast:</h3>';
    forecastWeatherInfo.innerHTML = '';
    dailyForecasts.forEach((forecast) => {

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <p><strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong></p>
            <p>${forecast.weather[0].description}</p>
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>Wind: ${forecast.wind.speed} m/s</p>
        `;
        forecastWeatherInfo.appendChild(forecastElement);
    });
}

function fillWeather() {
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeather(cityName);
    }
}
// Handle search button click
searchButton.addEventListener('click', () => {
    fillWeather()
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        fillWeather()
    }
});