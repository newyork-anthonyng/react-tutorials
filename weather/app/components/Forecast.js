var React = require('react');
var PropTypes = React.PropTypes;

var Forecast = React.createClass({
	render: function() {
		return (
			<div>
				<div>Forecast</div>
				<br />
				{this.props.isLoading === true
					? <h1>Loading</h1>
					: <p>Not Loading</p>
				}
			</div>
		);
	},

	propTypes: {
		isLoading: PropTypes.bool.isRequired,
		weather: PropTypes.array.isRequired
	}
});

module.exports = Forecast;
