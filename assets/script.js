//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - key for 5 day forcast
var APIKey = "34076cf95082839460dfb8d261ada036";
var queryURL = "https://api.openweathermap.org/data/2.5";
var previousSearches = [];

document.addEventListener("DOMContentLoaded", function () {
  // Timer function to present local date and time in header
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});

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
      // Display current searched weather data
      var cityState = document.querySelector(".city-state");
      cityState.innerHTML = data.name + ", " + data.sys.country;
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
      displayPreviousSearches();
    })
    .then(() => {
      get5DayForecast(city);
    });
  function get5DayForecast(city) {
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey;
    fetch(forecastURL)
      .then((response) => response.json())
      .then((data) => {
        // Display 5 day forecast data
        var forecastContainer = document.querySelector(".forecast .container");
        forecastContainer.innerHTML = "";
        for (var i = 0; i < data.list.length; i++) {
          var forecast = data.list[i];
          var forecastDate = new Date(forecast.dt * 1000);
          var forecastIcon = forecast.weather[0].icon;
          var forecastTempF = ((forecast.main.temp - 273.15) * 9) / 5 + 32;
          var forecastHumidity = forecast.main.humidity;
          forecastContainer.innerHTML += `
              <div class="forecast-item">
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
var cityData = data;
function displayPreviousSearches() {
  var previousSearchesDiv = document.querySelector(".previousSearches");
  previousSearchesDiv.innerHTML += `<p>City: ${cityData.name}, ${cityData.sys.country}</p>`;
  for (var i = 0; i < previousSearches.length; i++) {
    var cityData = previousSearches[i];
    previousSearchesDiv.innerHTML += `<p>City: ${cityData.name}, ${cityData.sys.country}</p>`;
  }
}
