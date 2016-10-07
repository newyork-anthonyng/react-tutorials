import React from 'react';
const PropTypes = React.PropTypes;
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
	canDrop: function(props) {
		return canMoveKnight(props.x, props.y);
	},

	drop: function(props) {
		moveKnight(props.x, props.y);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

const BoardSquare = React.createClass({
	propTypes: {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired
	},

	renderOverlay: function(color) {
		const style = {
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			width: '100%',
			zIndex: 1,
			opacity: 0.5,
			backgroundColor: color
		}

		return (
			<div style={style} />
		);
	},

	render: function() {
		const x = this.props.x;
		const y = this.props.y;
		const black = (x + y) % 2 === 1;
		const isOver = this.props.isOver;
		const canDrop = this.props.canDrop;
		const connectDropTarget = this.props.connectDropTarget;

		const squareStyle = {
			position: 'relative',
			width: '100%',
			height: '100%'
		};

		return connectDropTarget(
			<div style={squareStyle}>
				<Square black={black}>
					{this.props.children}
				</Square>
				{isOver && !canDrop && this.renderOverlay('red')}
				{!isOver && canDrop && this.renderOverlay('yellow')}
				{isOver && canDrop && this.renderOverlay('green')}
			</div>
		);
	}
});

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
