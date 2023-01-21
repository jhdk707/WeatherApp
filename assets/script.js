var APIKey = "34076cf95082839460dfb8d261ada036";

const currentDay = document.querySelector(".currentDay");
setInterval(() => {
  let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
  currentDay.innerHTML = time;
}, 1000);
