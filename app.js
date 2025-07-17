// OpenWeatherMap API key
const apiKey = "34db26c4d9ce9b44a88e86a683ee6abb";

// Base URL for weather API with metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Async function to fetch and display weather data
async function checkWeather(city) {

    // Fetching weather data from the API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If city is not found (404 error), show error message
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } 
    else {
        // Parsing response JSON data
        var data = await response.json();

        // Updating city name
        document.querySelector(".city").innerHTML = data.name;

        // Updating temperature, rounded to nearest integer
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

        // Updating humidity
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        // Updating wind speed
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Setting weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Show weather data and hide error (if previously shown)
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Call the function with user input
});
