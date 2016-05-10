var React = require('react');

var backgroundStyle = {
	backgroundImage: 'url("app/images/pattern.svg")'
};

var Home = React.createClass({
	render: function() {
		return (
			<div style={backgroundStyle}>
				<h1>Enter a City and State</h1>
				<input type="input" placeholder="St. George, Utah" />
				<button type="submit">Get Weather</button>
			</div>
		);
	}
});

module.exports = Home;
