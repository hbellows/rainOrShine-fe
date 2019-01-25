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

	var productionUrl = 'https://rain-or-shine-1.herokuapp.com';

	function getWeather(location) {
	  debugger;
	  var location = location;
	  var url = productionUrl + '/api/v1/forecast?location=' + location;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (weatherResponse) {
	    return displayWeatherDetails(weatherResponse).catch(function (error) {
	      return console.log({ error: error });
	    });
	  });
	}

	$('#location-search').on('click', function () {
	  var location = $('#location').val();
	  getWeather(location);
	});

	function displayWeatherDetails(response) {
	  document.getElementById("current-summary-container").innerHTML = response.data.attributes.current_forecast;
	}

	// const fetchDiscussions = () => {
	//   fetch('/api/v1/discussions')
	//   .then((response) => response.json())
	//   .then((rawDiscussions) => cleanDiscussions(rawDiscussions))
	//   .catch((error) => console.error({ error }));
	// }

/***/ })
/******/ ]);