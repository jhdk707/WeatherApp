const currentDay = document.querySelector(".currentDay");
setInterval(() => {
  let time = dayjs().format("MM-DD-YYYY hh:mm:ss A");
  currentDay.innerHTML = time;
}, 1000);
