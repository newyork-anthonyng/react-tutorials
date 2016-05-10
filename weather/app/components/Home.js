var React = require('react');
var Search = require('./Search');
var Header = require('./Header');
var Style = require('../styles/Style');

var Home = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div style={Style.home}>
					<h1>Enter a City and State</h1>
					<Search />
				</div>
			</div>
		);
	}
});

module.exports = Home;
