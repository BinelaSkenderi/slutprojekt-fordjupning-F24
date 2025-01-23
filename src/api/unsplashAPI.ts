import { openCityImage } from "../constants/APIkeys";
import { displayCityImage } from "../utils/utils";

// Hämta stadens bild från Unsplash API
export async function getCityImage(city: string) {
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${openCityImage}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 2) {
        console.log(`image load`)
        const cityImage = data.results[2].urls.regular;
        displayCityImage(cityImage);
    }
}