import { getCityImage } from './api/unsplashAPI';
import { openWeatherApiKey } from './constants/APIkeys';
import { Weather } from './types/types';
import './style.scss';



// Hämta referenser till inmatningsfältet, sökknappen och behållare för väderinformation.
const cityInput = document.getElementById('city-input') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const weatherInfo = document.getElementById('weather-info') as HTMLElement;
const forecastWeatherInfo = document.getElementById('future-forecast') as HTMLElement; // New ID for 5-day forecast



// Hämta dagens väder för en given stad.
async function fetchWeather(cityName: string) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${openWeatherApiKey}`);
        //fetch() för att hämta data från OpenWeather API./${cityName} är den stad som användaren söker efter.//units=metric returneras i Celsius.//appid=${openWeatherApiKey} använder en API-nyckel för autentisering.

        if (!response.ok) throw new Error('City not found');
        //Om API-svaret inte är "ok" (t.ex. om staden inte finns), kastas ett fel.
        const weatherData = (await response.json()) as Weather; // vraca objekti    
        //Svaret konverteras till JSON och tolkas som ett Weather-objekt.

        displayWeather(
            // kallas för att visa informationen på sidan med innehåller beskrivning av vädret, temperaturen och vindhastigheten.
            weatherData.name,
            weatherData.weather[0].description,
            weatherData.main.temp,
            weatherData.wind.speed
        );
        fetchFiveDayForecast(cityName);
        // Hämtar en femdagarsprognos för staden.
        getCityImage(cityName);
        // Hämtar en bild för den valda staden
    } catch (error) {
        console.error('Error fetching weather:', error);
        // Om något går fel (t.ex. ogiltig stad, nätverksfel) skrivs ett felmeddelande ut i konsolen.
        weatherInfo.innerHTML = `<p>Could not find weather data for "${cityName}". Please try another city.</p>`;
    } //weatherInfo.innerHTML uppdateras med ett meddelande till användaren.
}



// Hämta 5-dagarsprognos
async function fetchFiveDayForecast(cityName: string) {
    //  hämtar en 5-dagars väderprognos för en given stad från OpenWeather API och visar informationen på webbsidan.
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

// Visa dagens väder 
function displayWeather(cityName: string, description: string, temperature: number, windSpeed: number) {
    weatherInfo.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <p>Description: ${description}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}



// Visa 5-dagarsprognos
function displayFiveDayForecast(forecastList: any[]) {
    const dailyForecasts = forecastList.filter((_, index) => index % 8 === 0); // OpenWeatherMap returns data every 3 hours
    // Vi går igenom varje prognos i den filtrerade listan (dailyForecasts), en per dag.

    //forecastWeatherInfo.innerHTML = '<h3>5-Day Forecast:</h3>';
    forecastWeatherInfo.innerHTML = '';
    dailyForecasts.forEach((forecast) => {

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML =
            ////Datum: forecast.dt * 1000 konverterar tidstämpeln (UNIX-tid i sekunder) till ett läsbart datum.
            `<p><strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong></p>
            <p>${forecast.weather[0].description}</p>
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>Wind: ${forecast.wind.speed} m/s</p>`;
        forecastWeatherInfo.appendChild(forecastElement);
    });
}



// Fyll väderinformation och hantera användarinmatning
function fillWeather() {
    const cityName = cityInput.value.trim();
    //tar värdet (texten) som användaren har skrivit in. //.trim() tar bort eventuella mellanslag i början och slutet av texten (för att undvika fel vid inmatning).
    if (cityName) {
        fetchWeather(cityName);
        //Anropar funktionen fetchWeather(cityName), som troligtvis hämtar väderdata från en API-tjänst (t.ex. OpenWeatherMap) baserat på stadens namn.
    }
}



// Event listeners för att hantera användarinmatning att klika på search knapen och att klika på enter.
searchButton.addEventListener('click', () => {
    fillWeather()
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        fillWeather()
    }
});