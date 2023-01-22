//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} - key for 5 day forcast

document.addEventListener("DOMContentLoaded", function () {
  // Timer function to present local date and time in header
  const currentDay = document.querySelector(".currentDay");
  setInterval(() => {
    let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
    currentDay.innerHTML = time;
  }, 1000);
});

var APIKey = "34076cf95082839460dfb8d261ada036";
var cityNameInput = document.getElementById("cityName");
var city = cityNameInput.value;
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;
fetch(queryURL);
