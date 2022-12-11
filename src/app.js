function searchCity() {
  console.log(searchInput.value);

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}`;
  console.log(apiUrl);
}

let apiKey = "2c8a3dfad180of4f0ft83a44b4afcc97";
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let citySearch = document.querySelector("#search-form");
let cityShown = document.querySelector("#cityShown");
let tempShown = document.querySelector("#temperatureShown");

citySearch.addEventListener("submit", searchCity);

//Theme Changing button
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

let themeBtn = document.querySelector(".theme");
themeBtn.addEventListener("click", changeTheme);
