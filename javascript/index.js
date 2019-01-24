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

function getWeather(location) {
  var location = 'denver,co'
  var url = `https://rain-or-shine-1.herokuapp.com/api/v1/forecast?location=${location}`
  fetch(url)
    .then(response) => response.json())
    .then((response) => {
      weatherData = response
      return this.displayWeatherDetails(response)
    }):
}

function displayWeatherDetails(response) {
  document.getElementById("current-summary").innerHTML = (response.data.attributes.current_summary)
}