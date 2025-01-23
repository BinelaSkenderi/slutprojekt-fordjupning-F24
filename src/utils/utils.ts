export function displayCityImage(imageUrl: string) {
    const imageContainer = document.getElementById('city-image');
    if (imageContainer) {
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="City Image" />`;
    }
}