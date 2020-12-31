// Inputs

let place = 'Marbella';
let isCelsius = true;
let tempUnit = 'C';
let temperature = '';
const API_KEY = 'ee2bedb8918a0bd649949ff77b458184';

const inputCityForm = document.getElementById('inputCityForm');
const inputCity = document.getElementById('inputCity');
const tempCelsius = document.getElementById('tempCelsius');
const infoCity = document.getElementById('infoCity');
const infoWeather = document.getElementById('infoWeather');
const infoTemp = document.getElementById('infoTemp');
const infoHumidity = document.getElementById('infoHumidity');
const infoWind = document.getElementById('infoWind');
const errorText = document.getElementById('errorText');

//Listeners

inputCityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  place = inputCity.value;
  inputCity.value = '';
  getWeather();
});

tempCelsius.addEventListener('change', e => {
  e.preventDefault();
  isCelsius = !isCelsius;
  tempUnit = isCelsius ? 'C' : 'F';
  getWeather();
});

// Functions 

const getWeather = async () => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&lang=sp&appid=${API_KEY}`;
  
  try {
    const response = await fetch(API_URL, {mode: 'cors'});
    const weatherData = await response.json();

    const weather = {
      place: weatherData.name + ', ' + weatherData.sys.country,
      description: weatherData.weather[0].description.replace(/\b\w/g, letter => (
        letter.toUpperCase())),
      tempInCelsius: weatherData.main.temp.toFixed(1),
      tempInFahrenheit: (weatherData.main.temp * 1.8 + 32).toFixed(1),
      humidity: weatherData.main.humidity + '%',
      wind: (weatherData.wind.speed * 3.6).toFixed(1) + ' km/h'
      };
    
    showWeather(weather);
        
  } catch (err) {
      showError(err);
  }
};
    
const showWeather = (weather) => {
  infoCity.textContent = weather.place;
  infoWeather.textContent = weather.description;
  infoTemp.textContent = setTemperature(weather.tempInCelsius, 
    weather.tempInFahrenheit);
  infoHumidity.textContent = weather.humidity;
  infoWind.textContent = weather.wind;
};

const setTemperature = (tempInCelsius, tempInFahrenheit) => isCelsius ? 
  tempInCelsius.toString() + 'º ' + `${tempUnit}` : 
  tempInFahrenheit.toString() + 'º ' + `${tempUnit}`;

const showError = (err) => {
  console.error(err);
  errorText.textContent = 'Vaya, no podemos encontrar la ciudad. Inténtalo de nuevo.';
};

getWeather();