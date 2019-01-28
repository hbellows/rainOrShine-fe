// This file is in the entry point in your webpack config.

// 1. Weather for a location:
// - GET /api/v1/forecast?location=denver,co
// 2. Favoriting Locations
//  - POST /api/v1/favorites
// 3. Listing Favorite Locations
//  - GET /api/v1/favorites?api_key={'blahblah'}
// 4. Removing Favorite Locations
//  - DELETE /api/v1/favorites
// 5. Account Creation:
// - POST /api/v1/users
// 6. Login/Logout
// - POST /api/v1/sessions

const productionUrl = 'https://rain-or-shine-1.herokuapp.com';
const api_key = 'abc123';
import Forecast from './forecast.js';
let forecast;
const displayWeather = () => {
  displayCurrentWeather()
  displayHourlyWeather()
  displayDailyWeather()
 };
const weatherIcons = {
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  'rain': 'wi-showers',
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'wind': 'wi-windy',
  'fog': 'wi-fog',
  'cloudy': 'wi-cloudy',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-cloudy'
}

$(document).ready(() => {
  getFavorites()
  eventListeners()
});

const eventListeners = () => {
  addFavorite()
  removeFavorite()
  favoriteWeather()
}

const favoriteToggle = ()  => {
  $('#add-favorite, #remove-favorite').click(function() {
    $('#add-favorite').toggle()
    $('#remove-favorite').toggle()
  })
}

const addFavorite = () => {
  $('.current-summary').click('.add-btn',(event) => {
    postFavorite();
    favoriteToggle();
  })
}

const removeFavorite = () => {
  $('.current-summary').click('.remove-btn',(event) => {
    deleteFavorite()
    favoriteToggle()
  })
}

const favoriteWeather = () => {
  $('#favorites').click('.favorite-links', (event) => {
    getCurrentWeather(event.target.id);
  });
}

const getCurrentWeather = (location) => {
  let url = `${productionUrl}/api/v1/forecast?location=${location}`;
  fetch(url)
  .then((response) => response.json())
  .then(data => {
    return forecast = new Forecast(data)
  })
  .then(displayWeather)
  .catch(error => {
    console.log(error)
  })
}

$('#location-search').on('click', function() {
  var location = $('#location').val()
  getCurrentWeather(location)
});

const displayCurrentWeather = () => {
  $("#current-summary").html('')
  $('#current-summary').append(`
  
    <div class='favorite-btn'>
      <div id='add-favorite'>
        <button class='add-btn'>Add</button>
      </div>

      <div id='remove-favorite' >
        <button class='remove-btn'>Remove</button>
      </div>
    </div>

    <div class="summary-left">
      <h2><span class="currently-location">${forecast.currentLocation()}</span></h2>
      <h4><span class="currently-time">${forecast.currentForecast().time_long}</span></h4>
      <h4><span id="currently-temperature">Now ${forecast.currentForecast().temp}</span>&deg;</h4>
      <h4><span id="currently-temperature">High ${forecast.dailyForecast()[0].high}</span>&deg;</h4>
      <h4><span id="currently-temperature">Low ${forecast.dailyForecast()[0].low}</span>&deg;</h4>
    </div>
  `);

  $("#current-details").html('');
  $('#current-details').append(`
    <div class="details">
      <div class="details-left">
        <h4><span id="Sunrise">Sunrise ${forecast.dailyForecast()[0].sunrise}</span></h4>
        <h4><span id="Sunset">Sunset ${forecast.dailyForecast()[0].sunset}</span></h4>
        <h4><span id="currently-summary">${forecast.dailyForecast()[0].summary}</span></h4>
        <h4><span id="currently-apparent-temperature">Feels Like ${forecast.currentForecast().feels_like}</span>&deg;</h4>
        <h4><span id="currently-humidity">Humdiity ${forecast.currentForecast().humidity}%</span></h4>
        <h4><span id="currently-uvIndex">UV Index ${forecast.currentForecast().uv_index}</span></h4>
      </div>
    </div>
  `);
  $('#current-summary, #current-details').css('display', 'inherit');
}

const displayHourlyWeather = () => {
  $(".hourly-container").html('')
  
  forecast.hourlyForecast().forEach(function(weather) {
    $('.hourly-container').append(`
      <div class='hourly-item'>
        <h5>${weather.time_short}</h5>
        <h5>${weather.temp}&deg;</h5>
        <h5>${weather.summary}</h5>
      </div>
    `)
  })
  $('#hourly').css('display', 'inherit')
}

const displayDailyWeather = () => {
  $("#daily").html('')
  forecast.dailyForecast().forEach(function(weather) {
    $('#daily').append(`
      <div class="daily-container">
        <h7 class="daily-day">${weather.day}</h7>
        <h7 class="daily-summary">${weather.summary}</h7>
        <h7 class="daily-precip">${weather.precip_prob}%</h7>
        <h7 class="daily-low">Low ${weather.low}&deg;</h7>
        <h7 class="daily-high">High ${weather.high}&deg;</h7>
      </div>
    `)
  })
  $('#daily').css('display', 'inherit')
}

const getFavorites = () => {
  let url = `${productionUrl}/api/v1/favorites?api_key=${api_key}`
  fetch(url)
  .then((response) => response.json())
  .then((res) => {
    displayFavorites(res)
  })
  .catch(error => {
    console.log(error)
  });
};

const displayFavorites = (response) => {
  $("#favorites").html('')
  
  let favorites = response.data
  
  favorites.forEach(function(location) {
    $('#favorites').append(`
      <a href="javascript:void(0)" class="favorite-links" id="${location.meta.data.id}">${location.meta.data.id}</a>
    `)
  })
}

const postFavorite = () => {
  fetch(`${productionUrl}/api/v1/favorites?api_key=${api_key}`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       "location": $("#location").val()
     })
   })
    .then(response => response.json())
    .catch(error => console.error(error))
    getFavorites();
}

const deleteFavorite = (location) => {
  let favoriteData = new FormData()
  favoriteData.append('location', location)
  favoriteData.append('api_key', api_key)
  fetch(`${productionUrl}/api/v1/favorites`, {
     method: 'DELETE',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(favoriteData)
   })
    .then(response => response.json())
    .catch(error => console.error(error))
    getFavorites();
}




// --------NOTES -> REMOVE ME BEFORE PUSH TO PRODUCTION--------
// The FormData interface provides a way to easily construct 
// a set of key/value pairs representing form fields and their values

// new FormData()

// FormData.append()
// Appends a new value onto an existing key inside 
// a FormData object, or adds the key if it does not already exist.

// --------------






