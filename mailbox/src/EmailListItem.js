import React from 'react';

const EmailListItem = ({ id, subject, from, to, on_click }) => {
	return (
		<tr onClick={() => on_click(id)}>
			<td>{subject}</td>
			<td>{from}</td>
			<td>{to}</td>
		</tr>
	);
};

export default EmailListItem;
