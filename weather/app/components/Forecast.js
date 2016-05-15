var React = require('react');
var PropTypes = React.PropTypes;

var Forecast = React.createClass({
	loadInformation: function() {
		if(this.props.isLoading) {
			return (
				<h1>Loading</h1>
			);
		} else {
			var allWeather = this.props.weather[1]['list'];
			var list = [];
			for(var i = 0; i < allWeather.length; i++) {
				list.push(
					<ul key={i}>
						<li key={i} onClick={this.props.onUserClick}><h2>{allWeather[i]['description']}</h2></li>
					</ul>
				);
			}
			return list;
		}
	},

	render: function() {
		return (
			<div>
				<div>Forecast</div>
				<br />
				{this.loadInformation()}
			</div>
		);
	},

	propTypes: {
		isLoading: PropTypes.bool.isRequired,
		weather: PropTypes.array.isRequired,
		onUserClick: PropTypes.func.isRequired
	}
});

module.exports = Forecast;
