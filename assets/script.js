//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - key for 5 day forcast
var APIKey = "34076cf95082839460dfb8d261ada036";
var queryURL = "https://api.openweathermap.org/data/2.5";

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
    })
    .catch((error) => {
      console.log(error);
    });
}
