var React = require('react');
var Forecast = require('../components/Forecast');
var weatherHelper = require('../utils/weatherHelper');

var ForecastContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	handleUserClick: function(e) {
		this.context.router.push({
			pathname: '/detail/' + this.state.city
		});
	},

	getInitialState: function() {
		return {
			isLoading: true,
			weather: [],
			city: ''
		};
	},

	componentDidMount: function() {
		var myCity = this.props.params.city;

		weatherHelper.getWeather(myCity)
			.then(function(data) {

				console.log(data);
				this.setState({
					isLoading: false,
					weather: data,
					city: data[1]['city']
				});

			}.bind(this));
	},

	render: function() {
		return (
			<Forecast
				isLoading={this.state.isLoading}
				weather={this.state.weather}
				onUserClick={this.handleUserClick}
			/>
		);
	}
});

module.exports = ForecastContainer;
