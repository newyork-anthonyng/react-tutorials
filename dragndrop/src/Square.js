import React from 'react';

const Square = React.createClass({
	propTypes: {
		black: React.PropTypes.bool
	},

	render: function() {
		const black = this.props.black;
		const fill = black ? 'black' : 'white';
		const stroke = black ? 'white': 'black';
		const squareStyle = {
			backgroundColor: fill,
			color: stroke,
			width: '100%',
			height: '100%'
		};

		return (
			<div style={squareStyle}>
				{this.props.children}
			</div>
		);
	}
});

export default Square;
