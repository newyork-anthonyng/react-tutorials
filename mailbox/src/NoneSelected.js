import React from 'react';

const NoneSelected = ({ text }) => {
	return (
		<div className="none-selected">
			<span>No {text} selected.</span>
		</div>
	);
};

export default NoneSelected;
