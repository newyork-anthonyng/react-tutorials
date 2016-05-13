var React = require('react');
var SearchContainer = require('../containers/SearchContainer');
var Header = require('./Header');
var Style = require('../styles/Style');

var Home = React.createClass({
	render: function() {
		return (
			<div>
				<div style={Style.home}>
					<h1>Enter a City and State</h1>
					<SearchContainer />
				</div>
			</div>
		);
	}
});

module.exports = Home;
