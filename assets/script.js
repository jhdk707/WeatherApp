var APIKey = "34076cf95082839460dfb8d261ada036";
var queryURL = "https://api.openweathermap.org/data/2.5";
var previousSearches = [];
var forecastContainer = document.querySelector(".forecastContainer");

document.addEventListener("DOMContentLoaded", function () {
  // Timer function to present local date and time in header
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});
//// gets City name request via input box and search button
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  getCityName();
});

function getCityName() {
  var cityNameInput = document.getElementById("cityName");
  var city = cityNameInput.value;
  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Display current searched weather data //////////////////////////////
      var currentWeather = data.weather[0].main;
      var kelvinTemp = data.main.temp;
      var currentTempF = ((kelvinTemp - 273.15) * 9) / 5 + 32;
      var currentHumidity = data.main.humidity;
      var currentWind = data.wind.speed;
      var currentIcon = data.weather[0].icon;
      var currentDisplay = document.querySelector(".currentDisplay");
      cityNameInput.value = "";
      currentDisplay.innerHTML = `<p>City: ${data.name}, ${data.sys.country}</p>
      <p>Weather: ${currentWeather}</p>
      <p>Temperature: ${currentTempF.toFixed(2)}F</p>
      <p>Humidity: ${currentHumidity}</p>
      <p>Wind Speed: ${currentWind}</p>
      <img src="https://openweathermap.org/img/w/${currentIcon}.png">`;
      previousSearches.push(data);
      displayPreviousSearches(data);
      get5DayForecast(city, data);
    });
  function get5DayForecast(city) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey;
    fetch(forecastURL)
      .then((response) => response.json())
      .then((forecastData) => {
        // Get todays date ///////////////////////////////////////////////////
        var today = new Date();
        // Create new empty array to store the 5 day forecast ////////////////
        var fiveDayForecast = [];
        // Loop through all of the forecast data /////////////////////////////
        for (var i = 0; i < fiveDayForecast.length; i++) {
          var forecast = forecastData.list[i];
          var forecastData = new Date(forecast.dt * 1000);
          // Check if the forecast is withing the next 5 days
          if (
            forecastData.getTime() >= today.getTime() &&
            forecastData.getTime() < today.getTime() + 5 * 24 * 60 * 60 * 1000
          ) {
            // If it is, add it to the fiveDayForecast array
            fiveDayForecast.push(forecast);
          }
        }
        // Display 5 day forecast data ///////////////////////////////////////
        forecastContainer.innerHTML = "";
        for (var i = 0; i < fiveDayForecast.length; i++) {
          var forecast = fiveDayForecast[i];
          var forecastDate = new Date(forecast.dt * 1000);
          var forecastIcon = forecast.weather[0].icon;
          var forecastTempF = ((forecast.main.temp - 273.15) * 9) / 5 + 32;
          var forecastHumidity = forecast.main.humidity;
          forecastContainer.innerHTML += `
                    <div class ="forecast-item" >
                      <p>Date: ${forecastDate.toLocaleDateString()}</p>
                      <img src="https://openweathermap.org/img/w/${forecastIcon}.png">
                      <p>Temperature: ${forecastTempF.toFixed(2)}F</p>
                      <p>Humidity: ${forecastHumidity}</p>
                    </div>
                  `;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
function displayPreviousSearches(cityData) {
  var previousSearchesContainer = document.querySelector(
    ".previousSearchesContainer"
  );
  previousSearchesContainer.innerHTML = "";
  for (var i = 0; i < previousSearchesContainer.length; i++) {
    var cityData = previousSearches[i];
    var cityName = cityData.name;
    var cityCountry = cityData.sys.country;
    previousSearchesContainer.innerHTML += `<p>${cityName}, ${cityCountry}</p>`;
  }
}
