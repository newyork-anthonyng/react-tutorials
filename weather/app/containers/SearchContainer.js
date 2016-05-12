var React = require('react');
var Search = require('../components/Search');
var weatherHelper = require('../utils/weatherHelper');

var PromptContainer = React.createClass({
	getInitialState: function() {
		return {
			city: ''
		};
	},

	handleUpdateCity: function(e) {
		this.setState({
			city: e.target.value
		});
	},

	getWeather: function() {

		weatherHelper.getCurrentWeather(this.state.city)
			.then(function(data) {
				console.log('%c Current Weather', 'background-color: yellow;');
				console.log(data);
			});

		weatherHelper.getFiveDayForecast(this.state.city)
			.then(function(data) {
				console.log('%c Five Day Forecast', 'background-color: yellow;');
				console.log(data);
			});
	},

	render: function() {
		return (
			<Search
				onUpdateCity={this.handleUpdateCity}
				city={this.state.city}
				getWeather={this.getWeather}
			/>
		);
	}
});

module.exports = PromptContainer;
