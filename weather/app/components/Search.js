var React = require('react');
var PropTypes = React.PropTypes;

var Search = React.createClass({
	render: function() {
		return (
			<div>
				<input
					type="input"
					placeholder="St. George, Utah"
					onChange={this.props.onUpdateCity}
					value={this.props.city}
				/>

				<button type="submit" onClick={this.props.getWeather}>
					Get Weather
				</button>
			</div>
		);
	},

	propTypes: {
		onUpdateCity: PropTypes.func.isRequired,
		city: PropTypes.string.isRequired,
		getWeather: PropTypes.func.isRequired
	}
});

module.exports = Search;
