import React from 'react';

const AwesomeComponent = React.createClass({
	getInitialState: function() {
		return {
			likesCount: 0
		};
	},

	onLike: function() {
		const newLikesCount = this.state.likesCount + 1;
		this.setState({ likesCount: newLikesCount });
	},

	render: function() {
		return (
			<div>
				Likes : <span>{this.state.likesCount}</span>
				<div><button onClick={this.onLike}>Like Me</button></div>
			</div>
		);
	}
});

export default AwesomeComponent;
