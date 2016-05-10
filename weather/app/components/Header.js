var React = require('react');
var Search = require('./Search');
var Style = require('../styles/Style');

var Header = React.createClass({
	render: function() {
		return (
			<div style={Style.header}>
				<h1>Clever Title</h1>
				<Search />
			</div>
		);
	}
});

module.exports = Header;
