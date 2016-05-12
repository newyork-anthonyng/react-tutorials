var axios = require('axios');

var API_KEY = process.env.WEATHER_API_KEY;

function getCurrentWeather(city) {
	var myUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city + '&type=accurate&APPID=' + API_KEY;

	return axios.get(myUrl);
}

function getFiveDayForecast(city) {
	var myUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=imperail&type=accurate&APPID=' + API_KEY + '&cnt=5';

	return axios.get(myUrl);
}

var helpers = {
	getCurrentWeather: getCurrentWeather,
	getFiveDayForecast: getFiveDayForecast
};

module.exports = helpers;
