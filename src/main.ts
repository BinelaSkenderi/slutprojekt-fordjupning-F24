import { getCityImage } from './api/unsplashAPI';
import { geoNamesUsername, openWeatherApiKey } from './constants/APIkeys';
import './style.scss'
import { City } from './types/types';


// Get references to the dropdown and weather info container
const cityDropdown = document.getElementById('cities') as HTMLSelectElement;
const weatherInfo = document.getElementById('weather-info') as HTMLElement;

let cities: City[] = []




//  Hämta städer från Geonames API
async function fetchCities() {
    try {

        const response = await fetch(
            `http://api.geonames.org/citiesJSON?formatted=true&north=69.0&south=55.0&east=24.0&west=11.0&maxRows=10&username=${geoNamesUsername}`
        );
        const data = await response.json();
        console.log(data)
        cities = data.geonames;
        populateCityDropdown(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

// Fyll dropdown med städer
function populateCityDropdown(cities: City[]) {
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });
}

//  Hämta väder för den valda staden
async function fetchWeather(city: City) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${openWeatherApiKey}`
        );
        const weatherData = await response.json();
        displayWeather(weatherData.weather[0].description, weatherData.main.temp);
    } catch (error) {
        console.error('Fel vid hämtning av väder:', error);
    }
}

// Visa väderinformation på sidan
function displayWeather(description: string, temperature: number) {
    weatherInfo.innerHTML = `
    <h2>Weather:</h2>
    <p>Description: ${description}</p>
    <p>Temperature: ${temperature}°C</p>
  `;
}

// Hantera när en stad väljs från dropdown
cityDropdown.addEventListener('change', (event) => {

    const selectedCityName = (event.target as HTMLSelectElement).value;
    if (selectedCityName) {
        const city = cities.find((city) => city.name === selectedCityName);
        console.log(city)
        console.log(cities)

        if (city) {
            fetchWeather(city);
            getCityImage(city.name)
        }
    }
});



// Hämta städer vid sidladdning

fetchCities();
