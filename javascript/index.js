// This file is in the entry point in your webpack config.

require('hot-module-replacement')({
  // options are optional
  ignore: /node_modules/  // regexp to decide if module should be ignored; also can be a function accepting string and returning true/false
})

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
 }
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
  getFavorites();
  favoriteToggle();
});

const getCurrentWeather = (location) => {
  let url = `${productionUrl}/api/v1/forecast?location=${location}`;
  fetch(url)
  .then((response) => response.json())
  .then(data => {
    return forecast = new Forecast(data);
  })
  .then(displayWeather)
  .catch(error => {
    console.log(error)
  });
};

$('#location-search').on('click', function() {
  var location = $('#location').val();
  getCurrentWeather(location);
});

const displayCurrentWeather = () => {
  $("#current-summary").html('');
  $('#current-summary').append(`
  
  <div class="summary-left">
    <div class='favorite-btn'>
      <div id='add-favorite'>
        <button class='add-btn' onclick="postFavorite()">Add</button>
      </div>

      <div id='remove-favorite' >
        <button class='remove-btn' onclick="deleteFavorite(location)">Remove</button>
      </div>
    </div>

    <h2><span class="currently-location">${forecast.currentLocation()}</span></h2>
    <h2><span class="currently-time">${forecast.currentForecast().time_long}</span></h2>
  </div>
  
  <div class="summary-right">
    <h2><span id="currently-temperature">Now ${forecast.currentForecast().temp}</span>&deg;</h2>
    <h2>
      <span id="currently-temperature">Low ${forecast.dailyForecast()[0].low}</span>&deg;
      <span id="currently-temperature">High ${forecast.dailyForecast()[0].high}</span>&deg;
    </h2>
  </div>
  `);

  $("#current-details").html('');
  $('#current-details').append(`
    <div class="details">
      <div class="details-left>
        <h5><span id="currently-Sunrise">Sunrise ${forecast.dailyForecast()[0].sunrise}</span></h5>
        <h5><span id="currently-Sunset">Sunset ${forecast.dailyForecast()[0].sunset}</span></h5>
        <i id="wi ${weatherIcons[forecast.dailyForecast()[0].icon]} wi-fw"></i> 
        <h5><span id="currently-summary">${forecast.dailyForecast()[0].summary}</span></h5>
       </div>

      <div class"details-right">
        <h5><span id="currently-apparent-temperature">Feels Like ${forecast.currentForecast().feels_like}</span>&deg;</h5>
        <h5><span id="currently-humidity">Humdiity ${forecast.currentForecast().humidity}%</span></h5>
        <h5><span id="currently-uvIndex">UV Index ${forecast.currentForecast().uv_index}</span></h5>
      </div>
    </div>
  `);
  $('#current-summary, #current-details').css('display', 'inherit');
}

const displayHourlyWeather = () => {
  $(".hourly-container").html('');
  
  forecast.hourlyForecast().forEach(function(weather) {
    
    $('.hourly-container').append(`
      <div class='hourly-item'>
        <h4>${weather.time_short}</h4>
        <h4>${weather.summary}</h4>
      </div>
    `)
  })
  $('#hourly').css('display', 'inherit');
};

const getFavorites = () => {
  let url = `${productionUrl}/api/v1/favorites?api_key=${api_key}`
  fetch(url)
  .then((response) => response.json())
  .then((res) => {
    displayFavorites(res);
  })
  .catch(error => {
    console.log(error)
  });
};

const displayFavorites = (response) => {
  $("#favorites").html('');
  
  let favorites = response.data
  
  favorites.forEach(function(location) {
    $('#favorites').append(`
      <h3 id="favorite">${location.meta.data.id}</h3>
    `)
  });
}

const postFavorite = (location) => {
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
  let favoriteData = new formData()
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

const favoriteToggle = ()  => {
  $('#add-favorite, #remove-favorite').click(function() {
    $('#add-favorite').toggle()
    $('#remove-favorite').toggle()
  })
}

// -------------HMR CONFIG-------------

// let foo = require('.index.js');
 
// if (module.hot) { 
//   module.hot.accept('.index.js', () => {
//     // if foo.js or any files that foo.js depend on are modified this callback is invoked
//     foo = require('.index.js'); // by this time module cache entry for 'foo' already cleaned and module reloaded, requiring again is the easiest way of geting reference to new module. We need to assign it to local foo variable to make our local code in this file aware of it.
//   })
// }



// --------NOTES -> REMOVE ME BEFORE PUSH TO PRODUCTION--------
// The FormData interface provides a way to easily construct 
// a set of key/value pairs representing form fields and their values

// new formData()

// FormData.append()
// Appends a new value onto an existing key inside 
// a FormData object, or adds the key if it does not already exist.

// --------------






