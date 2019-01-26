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
/***/ (function(module, exports) {

	'use strict';

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

	var getCurrentWeather = function getCurrentWeather(location) {
	  var url = productionUrl + '/api/v1/forecast?location=' + location;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (res) {
	    displayCurrentWeatherSummary(res);
	  }).catch(function (error) {
	    console.log(error);
	  });
	};

	$('#location-search').on('click', function () {
	  var location = $('#location').val();
	  getCurrentWeather(location);
	});

	var displayCurrentWeatherSummary = function displayCurrentWeatherSummary(response) {
	  // document.getElementById("current-summary-container").innerHTML = (response.data.attributes.current_forecast.time)
	  $("#current-summary").html('');
	  $('#current-summary').append('\n    <div class="summary-left">\n      <h5>\n        <span class="currently-location">' + response.data.id + '</span>\n      </h5>\n      <h5>\n        <span id="currently-summary">' + response.data.attributes.current_forecast.summary + '</span>\n      </h5>\n      <h5>\n        <span class="currently-time">' + response.data.attributes.current_forecast.time + '</span>\n      </h5>\n      <h5>\n        <span id="currently-temperature">Now ' + response.data.attributes.current_forecast.temp + '</span>&deg;\n      </h5>\n      <h5>\n        <span id="currently-apparent-temperature">Feels Like ' + response.data.attributes.current_forecast.feels_like + '</span>&deg;\n      </h5>\n      <h5>\n        <span id="currently-humidity">Humdiity ' + response.data.attributes.current_forecast.humidity + '%</span>\n      </h5>\n      <h5>\n        <span id="currently-uvIndex">UV Index ' + response.data.attributes.current_forecast.uv_index + '</span>\n      </h5>\n    </div>\n  ');
	  $('#current-summary').css('display', 'inherit');
	};

/***/ })
/******/ ]);