var axios = require('axios');

var API_KEY = process.env.WEATHER_API_KEY;

function getWeather(city) {
	var currentWeather = getCurrentWeather(city);
	var fiveDayForecast = getFiveDayForecast(city);

	return axios.all([currentWeather, fiveDayForecast])
		.then(function(data) {
			return data;
		});
}

function getCurrentWeather(city) {
	var myUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + city + '&type=accurate&APPID=' + API_KEY;

	return axios.get(myUrl)
					.then(parseCurrentWeather);
}

function getFiveDayForecast(city) {
	var myUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=imperial&type=accurate&APPID=' + API_KEY + '&cnt=5';

	return axios.get(myUrl)
					.then(parseFiveDayForecast);
}

function parseCurrentWeather(weather) {
	var myData = {};

	myData['city'] = weather['data']['name'];
	myData['description'] = weather['data']['weather'][0]['description'];
	myData['min'] = weather['data']['main']['temp_min'];
	myData['max'] = weather['data']['main']['temp_max'];
	myData['humidity'] = weather['data']['main']['humidity'];

	return myData;
}

function parseFiveDayForecast(weather) {
	var myData = {};

	myData['city'] = weather['data']['city']['name'];
	myData['list'] = weather['data']['list'].map(function(currentValue) {
		return {
			description: currentValue['weather'][0]['description'],
			min: currentValue['temp']['min'],
			max: currentValue['temp']['max'],
			humidity: currentValue['humidity']
		};
	});

	return myData;
}

var helpers = {
	getCurrentWeather: getCurrentWeather,
	getFiveDayForecast: getFiveDayForecast,
	getWeather: getWeather
};

module.exports = helpers;
