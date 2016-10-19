import React from 'react';
import { Information, Meta } from './WorkspaceComponents';

function ImagePreview({ image, price, people }) {
	return (
		<div className="ImagePreview" style={{'backgroundImage': 'url(' + image + ')'}}>
			<div className="WorkspaceOverview">
				<Information name="Coworking Space, South Korea" price={price} duration="1" />
				<Meta people={people} />
			</div>
		</div>
	);
}

export default ImagePreview;
