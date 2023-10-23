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

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `response.data.weather[0].description`);

  showTime(response.data.dt * 1000);
  console.log(response.data);
  Forcast(response.data.coord);
}

function Forcast(coordinates) {
  let apiKey = "33a04f162337od33e065b0c056atb7f0";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForcast);
}

function showForcast(response) {
  let forcastDaysElement = document.querySelector("#forcastDays");
  let forcastTempsElement = document.querySelector("#temps");
  console.log(forcastDaysElement);
  let forcastDays = "";
  let forcastTemps = "";
  let forcast = response.data.daily;
  console.log(forcast);

  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      console.log(forcastDay);
      forcastDays += `<td id="days">${formatday(forcastDay.time)}</td>`;
    }
  });
  forcastDaysElement.innerHTML = forcastDays;

  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      console.log(forcastDay);
      forcastTemps += `<td id="temps">
      <img 
        id="forcastWeatherIcon"  
        src="${forcastDay.condition.icon_url}"
        alt= ${forcastDay.condition.description}
        width="45px"
      />
      ${Math.round(forcastDay.temperature.day)} °C </td>`;
    }
  });
  forcastTempsElement.innerHTML = forcastTemps;
}

function formatday(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp);
  console.log(date);
  return days[date.getDay()];
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
    degree.innerHTML = Math.round(((degree.innerHTML - 32) * 5) / 9);
    celsiusDegree = true;
  }
}

function tofahrenheit(event) {
  event.preventDefault();
  if (celsiusDegree) {
    let degree = document.querySelector("#currentcitydeg");
    degree.innerHTML = Math.round((degree.innerHTML * 9) / 5 + 32);
    celsiusDegree = false;
  }
}

let currentCityButton = document.querySelector("#currentcitybutton");
currentCityButton.addEventListener("click", currentLocationTemp);
function currentLocationTemp() {
  navigator.geolocation.getCurrentPosition(showTempbyPosition);
}
function showTempbyPosition(position) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  let currentCity = document.querySelector("#currentcity");
  currentCity.innerHTML = "Local weather";
}

temp("Tehran");
