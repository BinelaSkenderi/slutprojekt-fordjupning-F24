import { getCityImage } from './api/unsplashAPI';
import { geoNamesUsername, openWeatherApiKey } from './constants/APIkeys';
import './style.scss';
import { City } from './types/types';

// Get references to the dropdown and weather info container
const cityDropdown = document.getElementById('cities') as HTMLSelectElement;
const weatherInfo = document.getElementById('weather-info') as HTMLElement;
const savedCitiesList = document.getElementById('saved-cities') as HTMLElement;

let cities: City[] = [];
let savedCities: City[] = []; // Array to store up to 3 cities

// Hämta städer från Geonames API
async function fetchCities() {
    try {
        const response = await fetch(
            `http://api.geonames.org/citiesJSON?formatted=true&north=69.0&south=55.0&east=24.0&west=11.0&maxRows=10&username=${geoNamesUsername}`
        );
        const data = await response.json();
        console.log(data);
        cities = data.geonames;
        populateCityDropdown(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

// Fyll dropdown med städer
function populateCityDropdown(cities: City[]) {
    cities.forEach((city) => {
        const option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.name;
        cityDropdown.appendChild(option);
    });
}

// Hämta väder för den valda staden
async function fetchWeather(city: City) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${openWeatherApiKey}`
        );
        const weatherData = await response.json();
        displayWeather(
            weatherData.weather[0].description,
            weatherData.main.temp,
            weatherData.wind.speed // Hämta vindhastighet från svaret
        );
    } catch (error) {
        console.error('Fel vid hämtning av väder:', error);
    }
}

// Visa väderinformation på sidan
function displayWeather(description: string, temperature: number, windSpeed: number) {
    weatherInfo.innerHTML = `
    <h2>Today:</h2>
    <p>Description: ${description}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Wind Speed: ${windSpeed} m/s</p> <!-- Lägg till vindhastighet -->
  `;
}

// Spara vald stad
function saveCity(city: City) {
    if (!savedCities.find((saved) => saved.name === city.name)) {
        if (savedCities.length < 3) {
            savedCities.push(city);
        } else {
            savedCities.shift(); // Ta bort den första staden om listan redan innehåller 3 städer
            savedCities.push(city);
        }
        updateSavedCitiesUI();
    }
}

// Uppdatera gränssnittet för sparade städer
function updateSavedCitiesUI() {
    savedCitiesList.innerHTML = '<h3>Saved Cities:</h3>';
    savedCities.forEach((city) => {
        const cityElement = document.createElement('p');
        cityElement.textContent = city.name;
        savedCitiesList.appendChild(cityElement);
    });
}

// Hantera när en stad väljs från dropdown
cityDropdown.addEventListener('change', (event) => {
    const selectedCityName = (event.target as HTMLSelectElement).value;
    if (selectedCityName) {
        const city = cities.find((city) => city.name === selectedCityName);
        console.log(city);
        console.log(cities);

        if (city) {
            fetchWeather(city);
            getCityImage(city.name);
            saveCity(city);
        }
    }
});

// Hämta städer vid sidladdning
fetchCities();















// // Get references to the dropdown and weather info container
// const cityDropdown = document.getElementById('cities') as HTMLSelectElement;
// const weatherInfo = document.getElementById('weather-info') as HTMLElement;
// const savedCitiesList = document.getElementById('saved-cities') as HTMLElement;

// let cities: City[] = [];
// let savedCities: City[] = []; // Array to store up to 3 cities

// // Hämta städer från Geonames API
// async function fetchCities() {
//     try {
//         const response = await fetch(
//             `http://api.geonames.org/citiesJSON?formatted=true&north=69.0&south=55.0&east=24.0&west=11.0&maxRows=10&username=${geoNamesUsername}`
//         );
//         const data = await response.json();
//         cities = data.geonames;
//         populateCityDropdown(cities);
//     } catch (error) {
//         console.error('Error fetching cities:', error);
//     }
// }

// // Fyll dropdown med städer
// function populateCityDropdown(cities: City[]) {
//     cities.forEach((city) => {
//         const option = document.createElement('option');
//         option.value = city.name;
//         option.textContent = city.name;
//         cityDropdown.appendChild(option);
//     });
// }

// // Hämta 5-dagarsprognos
// async function fetchFiveDayForecast(city: City) {
//     try {
//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${openWeatherApiKey}`
//         );
//         const forecastData = await response.json();
//         const fiveDayForecast = extractFiveDayForecast(forecastData);
//         displayFiveDayForecast(fiveDayForecast);
//     } catch (error) {
//         console.error('Fel vid hämtning av prognoser:', error);
//     }
// }

// // Extrahera 5-dagarsprognos
// function extractFiveDayForecast(data: any) {
//     const forecasts: any[] = [];

//     // Gruppera prognoser efter dag
//     const groupedByDay: { [key: string]: any[] } = {};
//     data.list.forEach((entry: any) => {
//         const entryDate = new Date(entry.dt_txt);
//         const dayKey = entryDate.toISOString().split('T')[0]; // YYYY-MM-DD
//         if (!groupedByDay[dayKey]) {
//             groupedByDay[dayKey] = [];
//         }
//         groupedByDay[dayKey].push(entry);
//     });

//     // Extrahera data för varje dag
//     Object.keys(groupedByDay).forEach((day) => {
//         const dayData = groupedByDay[day];
//         const averageTemp =
//             dayData.reduce((sum: number, entry: any) => sum + entry.main.temp, 0) /
//             dayData.length;
//         const averageWindSpeed =
//             dayData.reduce((sum: number, entry: any) => sum + entry.wind.speed, 0) /
//             dayData.length;

//         forecasts.push({
//             date: day,
//             description: dayData[0]?.weather[0].description || 'No data',
//             temperature: averageTemp.toFixed(1),
//             windSpeed: averageWindSpeed.toFixed(1),
//         });
//     });

//     return forecasts;
// }

// // Visa 5-dagarsprognos på sidan
// function displayFiveDayForecast(fiveDayForecast: any[]) {
//     weatherInfo.innerHTML = `<h2>5-Day Weather Forecast</h2>`;
//     fiveDayForecast.forEach((dayForecast) => {
//         weatherInfo.innerHTML += `
//             <div class="forecast-day">
//                 <h3>${new Date(dayForecast.date).toDateString()}</h3>
//                 <p>Description: ${dayForecast.description}</p>
//                 <p>Temperature: ${dayForecast.temperature}°C</p>
//                 <p>Wind Speed: ${dayForecast.windSpeed} m/s</p>
//             </div>
//         `;
//     });
// }

// // Spara vald stad
// function saveCity(city: City) {
//     if (!savedCities.find((saved) => saved.name === city.name)) {
//         if (savedCities.length < 3) {
//             savedCities.push(city);
//         } else {
//             savedCities.shift(); // Ta bort den första staden om listan redan innehåller 3 städer
//             savedCities.push(city);
//         }
//         updateSavedCitiesUI();
//     }
// }

// // Uppdatera gränssnittet för sparade städer
// function updateSavedCitiesUI() {
//     savedCitiesList.innerHTML = '<h3>Saved Cities:</h3>';
//     savedCities.forEach((city) => {
//         const cityElement = document.createElement('p');
//         cityElement.textContent = city.name;
//         savedCitiesList.appendChild(cityElement);
//     });
// }

// // Hantera när en stad väljs från dropdown
// cityDropdown.addEventListener('change', (event) => {
//     const selectedCityName = (event.target as HTMLSelectElement).value;
//     if (selectedCityName) {
//         const city = cities.find((city) => city.name === selectedCityName);
//         if (city) {
//             fetchFiveDayForecast(city);
//             getCityImage(city.name);
//             saveCity(city);
//         }
//     }
// });

// // Hämta städer vid sidladdning
// fetchCities();