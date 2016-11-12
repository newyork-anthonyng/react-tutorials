import React from 'react';

const Email = ({ from, to, subject, body }) => {
	return (
		<div className="email">
			<dl className="meta dl-horizontal">
				<dt>From</dt>
				<dd>{from}</dd>

				<dt>To</dt>
				<dd>{to}</dd>

				<dt>Subject</dt>
				<dd>{subject}</dd>
			</dl>
			<div
				className="body"
				dangerouslySetInnerHTML={{__html: body}} />
		</div>
	);
};

export default Email;
