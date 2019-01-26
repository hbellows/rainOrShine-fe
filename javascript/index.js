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

const getCurrentWeather = (location) => {
  let url = `${productionUrl}/api/v1/forecast?location=${location}`
  fetch(url)
  .then((response) => response.json())
  .then((res) => {
    displayCurrentWeatherSummary(res);
  })
  .catch(error => {
    console.log(error)
    });
};

$('#location-search').on('click', function() {
  var location = $('#location').val();
  getCurrentWeather(location);
});

const displayCurrentWeatherSummary = (response) => {
  // document.getElementById("current-summary-container").innerHTML = (response.data.attributes.current_forecast.time)
  $("#current-summary").html('');
  $('#current-summary').append(`
    <div class="summary-left">
      <h5><span class="currently-location">${response.data.id}</span></h5>
      <h5><span id="currently-summary">${response.data.attributes.current_forecast.summary}</span></h5>
      <h5><span class="currently-time">${response.data.attributes.current_forecast.time}</span></h5>
      <h5><span id="currently-temperature">Now ${response.data.attributes.current_forecast.temp}</span>&deg;</h5>
      <h5><span id="currently-apparent-temperature">Feels Like ${response.data.attributes.current_forecast.feels_like}</span>&deg;</h5>
      <h5><span id="currently-humidity">Humdiity ${response.data.attributes.current_forecast.humidity}%</span></h5>
      <h5><span id="currently-uvIndex">UV Index ${response.data.attributes.current_forecast.uv_index}</span></h5>
    </div>
  `);
  $('#current-summary').css('display', 'inherit');
}

const getFavorite = () => {
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

$("#Add").on("click", postFavorite)
   