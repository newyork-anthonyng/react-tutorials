let knightPosition = [1, 7];
let observer = null;

function emitChange() {
	observer(knightPosition);
}

exports.observe = function(o) {
	if(observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = o;
	emitChange();
};

exports.moveKnight = function(toX, toY) {
	knightPosition = [toX, toY];
	emitChange();
};

exports.canMoveKnight = function(toX, toY) {
	const x = knightPosition[0];
	const y = knightPosition[1];
	const dx = toX - x;
	const dy = toY - y;

	return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2);
};
