var React = require('react');
var Search = require('../components/Search');
var weatherHelper = require('../utils/weatherHelper');

var PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			city: ''
		};
	},

	handleUpdateCity: function(e) {
		this.setState({
			city: e.target.value
		});
	},

	getWeather: function() {
		if(this.state.city !== '') {
			this.context.router.push({
				pathname: '/forecast/' + this.state.city
			});
		}

		/*
		weatherHelper.getWeather(this.state.city)
			.then(function(data) {
				console.log(data);
			});
		*/
	},

	render: function() {
		return (
			<Search
				onUpdateCity={this.handleUpdateCity}
				city={this.state.city}
				getWeather={this.getWeather}
			/>
		);
	}
});

module.exports = PromptContainer;
