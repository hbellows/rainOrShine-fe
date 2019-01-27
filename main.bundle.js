/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _forecast = __webpack_require__(1);

	var _forecast2 = _interopRequireDefault(_forecast);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	var productionUrl = 'https://rain-or-shine-1.herokuapp.com';
	var api_key = 'abc123';

	var forecast = void 0;
	var displayWeather = function displayWeather() {
	  displayCurrentWeather();
	  displayHourlyWeather();
	  displayDailyWeather();
	};
	var weatherIcons = {
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
	};

	$(document).ready(function () {
	  getFavorites();
	  eventListeners();
	});

	var eventListeners = function eventListeners() {
	  addFavorite();
	  removeFavorite();
	};

	var favoriteToggle = function favoriteToggle() {
	  $('#add-favorite, #remove-favorite').click(function () {
	    $('#add-favorite').toggle();
	    $('#remove-favorite').toggle();
	  });
	};

	var addFavorite = function addFavorite() {
	  $('.current-summary').click('.add-btn', function (event) {
	    postFavorite();
	    favoriteToggle();
	  });
	};

	var removeFavorite = function removeFavorite() {
	  $('.current-summary').click('.remove-btn', function (event) {
	    deleteFavorite();
	    favoriteToggle();
	  });
	};

	var getCurrentWeather = function getCurrentWeather(location) {
	  var url = productionUrl + '/api/v1/forecast?location=' + location;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    return forecast = new _forecast2.default(data);
	  }).then(displayWeather).catch(function (error) {
	    console.log(error);
	  });
	};

	$('#location-search').on('click', function () {
	  var location = $('#location').val();
	  getCurrentWeather(location);
	});

	var displayCurrentWeather = function displayCurrentWeather() {
	  $("#current-summary").html('');
	  $('#current-summary').append('\n  \n  <div class=\'favorite-btn\'>\n    <div id=\'add-favorite\'>\n      <button class=\'add-btn\'>Add</button>\n    </div>\n\n    <div id=\'remove-favorite\' >\n      <button class=\'remove-btn\'>Remove</button>\n    </div>\n  </div>\n\n  <div class="summary-left">\n    <h2><span class="currently-location">' + forecast.currentLocation() + '</span></h2>\n    <h2><span class="currently-time">' + forecast.currentForecast().time_long + '</span></h2>\n  </div>\n  \n  <div class="summary-right">\n    <h2><span id="currently-temperature">Now ' + forecast.currentForecast().temp + '</span>&deg;</h2>\n    <h2>\n      <span id="currently-temperature">Low ' + forecast.dailyForecast()[0].low + '</span>&deg;\n      <span id="currently-temperature">High ' + forecast.dailyForecast()[0].high + '</span>&deg;\n    </h2>\n  </div>\n  ');

	  $("#current-details").html('');
	  $('#current-details').append('\n    <div class="details">\n      <div class="details-left">\n        <h4><span id="Sunrise">Sunrise ' + forecast.dailyForecast()[0].sunrise + '</span></h4>\n        <h4><span id="Sunset">Sunset ' + forecast.dailyForecast()[0].sunset + '</span></h4>\n        <h4><span id="currently-summary">' + forecast.dailyForecast()[0].summary + '</span></h4>\n       </div>\n\n      <div class"details-right">\n        <h4><span id="currently-apparent-temperature">Feels Like ' + forecast.currentForecast().feels_like + '</span>&deg;</h4>\n        <h4><span id="currently-humidity">Humdiity ' + forecast.currentForecast().humidity + '%</span></h4>\n        <h4><span id="currently-uvIndex">UV Index ' + forecast.currentForecast().uv_index + '</span></h4>\n      </div>\n    </div>\n  ');
	  $('#current-summary, #current-details').css('display', 'inherit');
	};

	var displayHourlyWeather = function displayHourlyWeather() {
	  $(".hourly-container").html('');

	  forecast.hourlyForecast().forEach(function (weather) {
	    $('.hourly-container').append('\n      <div class=\'hourly-item\'>\n        <h5>' + weather.time_short + '</h5>\n        <h5>' + weather.summary + '</h5>\n      </div>\n    ');
	  });
	  $('#hourly').css('display', 'inherit');
	};

	var displayDailyWeather = function displayDailyWeather() {
	  $("#daily").html('');
	  forecast.dailyForecast().forEach(function (weather) {
	    $('#daily').append('\n      <div class="daily-container">\n        <h7 class="daily-day">' + weather.day + '</h7>\n        <h7 class="daily-summary">' + weather.summary + '</h7>\n        <h7 class="daily-precip">' + weather.precip_prob + '%</h7>\n        <h7 class="daily-low">Low ' + weather.low + '&deg;</h7>\n        <h7 class="daily-high">High ' + weather.high + '&deg;</h7>\n      </div>\n    ');
	  });
	  $('#daily').css('display', 'inherit');
	};

	var getFavorites = function getFavorites() {
	  var url = productionUrl + '/api/v1/favorites?api_key=' + api_key;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (res) {
	    displayFavorites(res);
	  }).catch(function (error) {
	    console.log(error);
	  });
	};

	var displayFavorites = function displayFavorites(response) {
	  $("#favorites").html('');

	  var favorites = response.data;

	  favorites.forEach(function (location) {
	    $('#favorites').append('\n      <h3 id="favorite">' + location.meta.data.id + '</h3>\n    ');
	  });
	};

	var postFavorite = function postFavorite() {
	  fetch(productionUrl + '/api/v1/favorites?api_key=' + api_key, {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({
	      "location": $("#location").val()
	    })
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  });
	  getFavorites();
	};

	var deleteFavorite = function deleteFavorite(location) {
	  var favoriteData = new FormData();
	  favoriteData.append('location', location);
	  favoriteData.append('api_key', api_key);
	  fetch(productionUrl + '/api/v1/favorites', {
	    method: 'DELETE',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(favoriteData)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  });
	  getFavorites();
	};

	// --------NOTES -> REMOVE ME BEFORE PUSH TO PRODUCTION--------
	// The FormData interface provides a way to easily construct 
	// a set of key/value pairs representing form fields and their values

	// new FormData()

	// FormData.append()
	// Appends a new value onto an existing key inside 
	// a FormData object, or adds the key if it does not already exist.

	// --------------

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Forecast = function () {
	  function Forecast(data) {
	    _classCallCheck(this, Forecast);

	    this.weather_data = data;
	  }

	  _createClass(Forecast, [{
	    key: "currentLocation",
	    value: function currentLocation() {
	      return this.weather_data.data.id;
	    }
	  }, {
	    key: "currentForecast",
	    value: function currentForecast() {
	      return this.weather_data.data.attributes.current_forecast;
	    }
	  }, {
	    key: "hourlyForecast",
	    value: function hourlyForecast() {
	      return this.weather_data.data.attributes.hourly_forecast.slice(0, 12);
	    }
	  }, {
	    key: "dailyForecast",
	    value: function dailyForecast() {
	      return this.weather_data.data.attributes.daily_forecast;
	    }
	  }]);

	  return Forecast;
	}();

	exports.default = Forecast;
	;

/***/ })
/******/ ]);