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
const api_key = 'abc123'

$(document).ready(() => {
  getFavorites();
});

const getCurrentWeather = (location) => {
  let url = `${productionUrl}/api/v1/forecast?location=${location}`
  fetch(url)
  .then((response) => response.json())
  .then((res) => {
    displayCurrentWeatherSummary(res);
  })
  // .then((res) => {
  //   displayHourlyWeather(res);
  // })
  // .then((res) => {
  //   displayDailyWeather(res);
  // })
  .catch(error => {
    console.log(error)
    });
};

$('#location-search').on('click', function() {
  var location = $('#location').val();
  getCurrentWeather(location);
});

const displayCurrentWeatherSummary = (response) => {
  $("#current-summary").html('');
  $('#current-summary').append(`
    <div class="summary-left">
      <h5><span class="currently-location">${response.data.id}</span></h5>
      <h5><span class="currently-time">${response.data.attributes.current_forecast.time}</span></h5>
      <h5><span id="currently-temperature">Now ${response.data.attributes.current_forecast.temp}</span>&deg;</h5>
      <h5>
        <span id="currently-temperature">Low ${response.data.attributes.daily_forecast[0].low}</span>&deg;
        <span id="currently-temperature">High ${response.data.attributes.daily_forecast[0].high}</span>&deg;
      </h5>
    </div>

    <div class="summary-right">

    </div>
  `);

  $("#current-details").html('');
  $('#current-details').append(`
    <div class="details">
      <div class="details-left>
      <h5><span id="currently-Sunrise">Sunrise ${response.data.attributes.daily_forecast[0].sunrise}</span></h5>
      <h5><span id="currently-Sunset">Sunset ${response.data.attributes.daily_forecast[0].sunset}</span></h5>
        <h5><span id="currently-summary">${response.data.attributes.daily_forecast[0].summary}</span></h5>
      </div>

      <div class"details-right">
        <h5><span id="currently-apparent-temperature">Feels Like ${response.data.attributes.current_forecast.feels_like}</span>&deg;</h5>
        <h5><span id="currently-humidity">Humdiity ${response.data.attributes.current_forecast.humidity}%</span></h5>
        <h5><span id="currently-uvIndex">UV Index ${response.data.attributes.current_forecast.uv_index}</span></h5>
        <h5><span id="currently-precip">${response.data.attributes.daily_forecast[0].precip_type}</span></h5>
      </div>
    </div>
  `);
  $('#current-summary, #current-details').css('display', 'inherit');
}

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
}

const displayFavorites = (response) => {
  $("#favorites").html('');
  
  let favorites = response.data
  
  favorites.forEach(function(location) {
    $('#favorites').append(`
    <h3><span id="favorite">${location.meta.data.id}</span></h3>
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

// --------NOTES -> REMOVE ME BEFORE PUSH TO PRODUCTION--------
// The FormData interface provides a way to easily construct 
// a set of key/value pairs representing form fields and their values

// new formData()

// FormData.append()
// Appends a new value onto an existing key inside 
// a FormData object, or adds the key if it does not already exist.

// --------------

{/* <div class='favorite-btn'>
  <div id='add-favortie'>
    <button class='add-btn' onclick="postFavorite()">Add</button>
  </div>

  <div id='remove-favorite' >
    <button class='remove-btn' onclick="deleteFavorite(location)">Remove</button>
  </div>
</div>

#remove-favorite {
  display: none;
}

$(document).ready(function() {
  $('#add-favorite, #remove-favorite').click(function() {
    $('#add-favorite').toggle()
    $('#remove-favorite').toggle()
  })
}) */}