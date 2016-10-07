import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Game from './Game';
import './index.css';

Game.observe(function(knightPosition) {
	ReactDOM.render(
		<Board knightPosition={knightPosition} />,
		document.getElementById('root')
	);
});
