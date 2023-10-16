let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showTime(timestamp) {
  let date = new Date(timestamp);
  let day = days[date.getDay()];
  console.log(day);
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let time = `${hour}:${min}`;
  let dateTime = document.querySelector(".dateTime");
  dateTime.innerHTML = `${day} ${time}`;
}

let citysSearchForm = document.querySelector("#citySearch");
citysSearchForm.addEventListener("submit", searchcity);

function searchcity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#currentcity");
  let searchedCity = document.querySelector("#searchcityinput");
  currentCity.innerHTML = searchedCity.value;
  temp(searchedCity.value);
}

function temp(city) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let currentDegree = response.data.main.temp;
  let degree = document.querySelector("#currentcitydeg");
  degree.innerHTML = Math.round(currentDegree);
  console.log(response.data);

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  showTime(response.data.dt * 1000);
}

let celsiusDegree = true;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tofahrenheit);
function toCelsius(event) {
  event.preventDefault();
  if (celsiusDegree == false) {
    let degree = document.querySelector("#currentcitydeg");
    degree.innerHTML = 33;
    celsiusDegree = true;
  }
}
function tofahrenheit(event) {
  event.preventDefault();
  if (celsiusDegree) {
    let degree = document.querySelector("#currentcitydeg");
    degree.innerHTML = 65;
    celsiusDegree = false;
  }
}

let currentCityButton = document.querySelector("#currentcitybutton");
currentCityButton.addEventListener("click", currentLocationTemp);
function currentLocationTemp() {
  navigator.geolocation.getCurrentPosition(showTempbyPosition);
}
function showTempbyPosition(position) {
  let apiKey = "73a00877081bd43422bdee0f3022beb5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  let currentCity = document.querySelector("#currentcity");
  currentCity.innerHTML = "Local weather";
}

temp("Tehran");
