// Inputs

let place = 'Marbella';
let isCelsius = true;
let tempInCelsiusFormat = '';
let tempInFahrenheitFormat = '';
const OPENWEATHER_API_KEY = 'ee2bedb8918a0bd649949ff77b458184';
const GIPHY_API_KEY = '6Yu5WjOIzRpZDtkElXYyErU6wMH3SOwG';

const inputCityForm = document.getElementById('inputCityForm');
const inputCity = document.getElementById('inputCity');
const tempCelsius = document.getElementById('tempCelsius');
const infoCity = document.getElementById('infoCity');
const infoWeather = document.getElementById('infoWeather');
const infoTemp = document.getElementById('infoTemp');
const infoHumidity = document.getElementById('infoHumidity');
const infoWind = document.getElementById('infoWind');
const weatherErrorText = document.getElementById('weatherErrorText');
const gifImage = document.getElementById('gifImage');
const gifErrorText = document.getElementById('gifErrorText');

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
  updateTemperature();
});

// Functions 

const getWeather = async () => {
  const OPENWEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&lang=sp&appid=${OPENWEATHER_API_KEY}`;
  
  try {
    const response = await fetch(OPENWEATHER_API_URL, {mode: 'cors'});
    const weatherData = await response.json();

    const weather = {
      mainWeather: weatherData.weather[0].main,
      place: weatherData.name + ', ' + weatherData.sys.country,
      description: weatherData.weather[0].description
        .replace(/\b\w/g, letter => (letter.toUpperCase())),
      tempInCelsius: weatherData.main.temp.toFixed(1),
      tempInFahrenheit: (weatherData.main.temp * 1.8 + 32).toFixed(1),
      humidity: weatherData.main.humidity + '%',
      wind: (weatherData.wind.speed * 3.6).toFixed(1) + ' km/h'
      };
    
    showWeather(weather);
    setTemperature(weather.tempInCelsius, weather.tempInFahrenheit);
    getGif(weather.mainWeather);
        
  } catch (err) {
      showWeatherError(err);
  }
};
    
const showWeather = (weather) => {
  infoCity.textContent = weather.place;
  infoWeather.textContent = weather.description;
  infoHumidity.textContent = weather.humidity;
  infoWind.textContent = weather.wind;
  weatherErrorText.textContent = '';
  gifErrorText.textContent = '';
};

const updateTemperature = () => { 
  infoTemp.textContent = isCelsius ? 
    tempInCelsiusFormat : tempInFahrenheitFormat;
};

const setTemperature = (tempInCelsius, tempInFahrenheit) => {
  tempInCelsiusFormat = tempInCelsius.toString() + 'º ' + 'C';
  tempInFahrenheitFormat = tempInFahrenheit.toString() + 'º ' + 'F';
  return updateTemperature();
};

const showWeatherError = (err) => {
  console.error(err);
  weatherErrorText.textContent = 'Vaya, no podemos encontrar la ciudad. Inténtalo de nuevo.';
};

const showGifError = (err) => {
  console.error(err);
  gifErrorText.textContent = 'Vaya, no hemos podido encontrar un gif.';
  gifImage.src = getGif('oops');
};

const getGif = (mainWeather) => {
  const keyword = mainWeather === 'Clear' ? 'Sunny' : mainWeather;
  const GIPHY_API_URL = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${keyword}&weirdness=0`;
  fetch(GIPHY_API_URL, {mode: 'cors'})
    .then(function(response) { 
      return response.json();
    })
    .then(function(gifData) {
      gifImage.src = gifData.data.images.original.url;
    })

    .catch (function(err) {
      showGifError(err);
    })
};

getWeather();
