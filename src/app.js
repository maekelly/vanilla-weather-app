homeWeather();

function handleCurrentPos(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(search);
}

function homeWeather() {
  navigator.geolocation.getCurrentPosition(handleCurrentPos);
}
function searchFct(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput.value}&key=${apiKey}`;
  axios.get(apiUrl).then(search);
}

function search(response) {
  let newIcon = response.data.daily[0].condition.icon_url;
  let cityShown = document.querySelector("#cityShown");
  let weatherType = document.querySelector("#weatherType");
  let humidityShown = document.querySelector(".humidity");
  let windShown = document.querySelector(".wind");
  let weatherIcon = document.querySelector("#currentIcon");
  let highT = document.querySelector("#highT");
  let lowT = document.querySelector("#lowT");
  let tempShown = document.querySelector("#temperatureShown");
  tempShown.innerHTML = Math.round(response.data.daily[0].temperature.day);
  weatherIcon.innerHTML = `<img src='${newIcon}'>`;
  highT.innerHTML = Math.round(response.data.daily[0].temperature.maximum);
  lowT.innerHTML = Math.round(response.data.daily[0].temperature.minimum);
  humidityShown.innerHTML = Math.round(
    response.data.daily[0].temperature.humidity
  );
  windShown.innerHTML = Math.round(response.data.daily[0].wind.speed);
  weatherType.innerHTML = response.data.daily[0].condition.description;
  cityShown.innerHTML = response.data.city;
  displayForecast();
}

let cityInput = document.querySelector("#search-input");
let citySearch = document.querySelector("#search-form");
let apiKey = "2c8a3dfad180of4f0ft83a44b4afcc97";
let homeBtn = document.querySelector("#home-btn");
citySearch.addEventListener("submit", searchFct);

let themeBtn = document.querySelector(".theme");
themeBtn.addEventListener("click", changeTheme);

let currentWeather = document.querySelector("#home-btn");
currentWeather.addEventListener("click", homeWeather);

function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    document.getElementById("sun").src = "./media/sun.png";
  } else {
    body.classList.add("dark");
    document.getElementById("sun").src = "./media/moon.png";
  }
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col" id="forecast">
    <p class="tomTemp">13ºC</p>
    <p class="fa-snowflake tomIcon"></p>
    <p id="tomFore">
    <span class="fore-temp-max">2</span>ºC/<span class="fore-temp-min">3</span>ºC</p>
    <p class="forePlaceholder firstDay">${day}</p>
  </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

// let day = days[now.getDay()];

// let firstDay = document.querySelector(".firstDay");
// let secondDay = document.querySelector(".secondDay");
// let thirdDay = document.querySelector(".thirdDay");
// let fourthDay = document.querySelector(".fourthDay");
// let fifthDay = document.querySelector(".fifthDay");
