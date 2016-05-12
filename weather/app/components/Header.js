var React = require('react');
var SearchContainer = require('../containers/SearchContainer');
var Style = require('../styles/Style');

var Header = React.createClass({
	render: function() {
		return (
			<div style={Style.header}>
				<h1>Clever Title</h1>
				<SearchContainer />
			</div>
		);
	}
});

module.exports = Header;
