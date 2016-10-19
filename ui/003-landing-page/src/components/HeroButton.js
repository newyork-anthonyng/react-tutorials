import React from 'react';

function HeroButton({primary, text}) {
	return (
		<a
			href="#"
			className="Button"
			data-primary={primary}>
			{text}
		</a>
	);
}

export default HeroButton;
