// This file is in the entry point in your webpack config.

// 1. Weather for a location:
// - GET /api/v1/forecast?location=denver,co
// 2. Account Creation:
// - POST /api/v1/users
// 3. Login/Logout
// - POST /api/v1/sessions
// 4. Favoriting Locations
//  - POST /api/v1/favorites
// 5. Listing Favorite Locations
//  - GET /api/v1/favorites?api_key={'blahblah'}
// 6. Removing Favorite Locations
//  - DELETE /api/v1/favorites

const productionUrl = 'https://rain-or-shine-1.herokuapp.com';

function getWeather(location) {
  // debugger
  var location = location
  var url = `${productionUrl}/api/v1/forecast?location=${location}`
  fetch(url)
  .then((response) => response.json())
  .then((res) => {
    return this.displayWeatherDetails(res)
  .catch(error => console.log({error}))
  });
}

$('#location-search').on('click', function() {
  var location = $('#location').val();
  getWeather(location);
});

function displayWeatherDetails(response) {
  document.getElementById("current-summary-container").innerHTML = (response.data.attributes.current_forecast)
}


// const fetchDiscussions = () => {
//   fetch('/api/v1/discussions')
//   .then((response) => response.json())
//   .then((rawDiscussions) => cleanDiscussions(rawDiscussions))
//   .catch((error) => console.error({ error }));
// }
