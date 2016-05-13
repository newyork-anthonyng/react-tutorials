var React = require('react');
var Forecast = require('../components/Forecast');
var weatherHelper = require('../utils/weatherHelper');

var ForecastContainer = React.createClass({
	getInitialState: function() {
		return {
			isLoading: true,
			weather: []
		};
	},

	componentDidMount: function() {
		var myCity = this.props.params.city;

		weatherHelper.getWeather(myCity)
			.then(function(data) {

				console.log(data);
				this.setState({
					isLoading: false
				});

			}.bind(this));
	},

	render: function() {
		return (
			<Forecast
				isLoading={this.state.isLoading}
				weather={this.state.weather}
			/>
		);
	}
});

module.exports = ForecastContainer;
