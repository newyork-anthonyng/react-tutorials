import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import Game from './Game';

const Board = React.createClass({
	propTypes: {
		knightPosition: React.PropTypes.arrayOf(
			React.PropTypes.number.isRequired
		).isRequired
	},

	renderSquare: function(i) {
		const x = i % 8;
		const y = Math.floor(i / 8);

		return (
			<div key={i}
				style={{ width: '12.5%', height: '12.5%' }}>
				<BoardSquare x={x}
					y={y}>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</div>
		);
	},

	renderPiece: function(x, y) {
		const knightX = this.props.knightPosition[0];
		const knightY = this.props.knightPosition[1];

		if(x === knightX && y === knightY) {
			return <Knight />;
		}
	},

	handleSquareClick: function(toX, toY) {
		if(Game.canMoveKnight(toX, toY)) {
			Game.moveKnight(toX, toY);
		}
	},

	render: function() {
		const squares = [];
		for(let i = 0; i < 64; i++) {
			squares.push(this.renderSquare(i));
		}

		const boardStyle = {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexWrap: 'wrap'
		};

		return (
			<div style={boardStyle}>
				{squares}
			</div>
		);
	}
});

export default DragDropContext(HTML5Backend)(Board);
