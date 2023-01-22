var APIKey = "34076cf95082839460dfb8d261ada036";
var city; 
api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Timer function to present local date and time in header 
const currentDay = document.querySelector(".currentDay");
setInterval(() => {
  let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
  currentDay.innerHTML = time;
}, 1000);
