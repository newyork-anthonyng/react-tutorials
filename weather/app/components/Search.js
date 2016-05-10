var React = require('react');

var Search = React.createClass({
	render: function() {
		return (
			<div>
				<input type="input" placeholder="St. George, Utah" />
				<button type="submit">Get Weather</button>
			</div>
		);
	}
});

module.exports = Search;
