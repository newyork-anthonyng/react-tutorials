import React from 'react';
import EmailListItem from './EmailListItem';

class EmailList extends React.Component {
	constructor(props) {
		super(props);

		this.onSelectEmail = this.onSelectEmail.bind(this);
		this.getEmailList = this.getEmailList.bind(this);
	}

	onSelectEmail(id) {
		this.props.onSelectEmail(id);
	}

	getEmailList() {
		console.log('from email list');
		console.log(this.props.emails);
		return this.props.emails.map((mail) => {
			return (
				<EmailListItem
					key={mail.id}
					id={mail.id}
					from={mail.from}
					to={mail.to}
					subject={mail.subject}
					on_click={this.onSelectEmail} />
			);
		});
	}

	render() {
		return (
			<table className="email-list">
				<thead>
					<tr>
						<th>Subject</th>
						<th>From</th>
						<th>To</th>
					</tr>
				</thead>
				<tbody>
					{this.getEmailList()}
				</tbody>
			</table>
		);
	}
};

export default EmailList;
