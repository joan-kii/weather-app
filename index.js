let place = document.querySelector('input').value || 'marbella';
const tempCelsius = document.getElementById('tempUnit').value;
const infoCity = document.getElementById('infoCity');
const infoWeather = document.getElementById('infoWeather');
const infoTemp = document.getElementById('infoTemp');
const infoHumidity = document.getElementById('infoHumidity');
const infoWind = document.getElementById('infoWind');
const infoHour = document.getElementById('infoHour');
const errorText = document.getElementById('errorText');
const API_KEY = 'ee2bedb8918a0bd649949ff77b458184';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`

const getWeather = async () => {
  try {
    const response = await fetch(API_URL, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData)
    infoCity.textContent = weatherData.name + ', ' + weatherData.sys.country;
    infoWeather.textContent = weatherData.weather[0].main;
    infoTemp.textContent = (tempCelsius ? 
      weatherData.main.temp - 273.15 : 
      (weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(1) + 'º';
    infoHumidity.textContent = weatherData.main.humidity + '%';
    infoWind.textContent = (weatherData.wind.speed * 3.6).toFixed(1) + ' km/h';
    /* infoHour.textContent = weatherData.weather[0].main; */
  } catch (err) {
    showError(err);
  }
};

const showError = (err) => {
  console.error(err);
  errorText.textContent = 'Oops, could not find city. Try again.';
};

getWeather();