import React from 'react';
import NoneSelected from './NoneSelected';
import Email from './Email';
import EmailList from './EmailList';

class Mailbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = { email_id: null };

		this.handleSelectEmail = this.handleSelectEmail.bind(this);
	}

	handleSelectEmail(id) {
		this.setState({
			email_id: id
		});
	}

	render() {
		const { email_id } = this.state;
		let selectedEmail;

		if(email_id) {
			const mail = this.props.emails.filter((mail) => {
				return mail.id === email_id;
			})[0];

			selectedEmail = <Email id={mail.id}
				from={mail.from}
				to={mail.to}
				subject={mail.subject}
				body={mail.body} />;
		} else {
			selectedEmail = <NoneSelected text="email" />;
		}

		console.log('from mailbox');
		console.log(this.props.emails);
		return (
			<div>
				<EmailList
					emails={this.props.emails}
					onSelectEmail={this.handleSelectEmail} />
				<div className="email-viewer">
					{selectedEmail}
				</div>
			</div>
		);
	}
};

export default Mailbox;
