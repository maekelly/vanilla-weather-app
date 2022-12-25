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
  displayForecast(response);
}

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6)
      forecastHTML =
        forecastHTML +
        `
    <div class="col" id="forecast">
    <p class="tomTemp">${Math.round(forecastDay.temperature.day)}ºC</p>
    <p class="tomIcon"><img class="tomImg" src=${
      forecastDay.condition.icon_url
    }></p>
    <p class="tomFore">
    <span class="fore-temp-max">${Math.round(
      forecastDay.temperature.maximum
    )}</span>ºC/<span class="fore-temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}</span>ºC</p>
    <p class="forePlaceholder">${formatDay(forecastDay.time)}</p>
    </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

let cityInput = document.querySelector("#search-input");
let apiKey = "2c8a3dfad180of4f0ft83a44b4afcc97";
let homeBtn = document.querySelector("#home-btn");
let themeBtn = document.querySelector(".theme");
let citySearch = document.querySelector("#search-form");
let currentWeather = document.querySelector("#home-btn");

themeBtn.addEventListener("click", changeTheme);
citySearch.addEventListener("submit", searchFct);
currentWeather.addEventListener("click", homeWeather);
