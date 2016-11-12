import React, { PropTypes } from 'react';

class MailboxList extends React.Component {
	constructor(props) {
		super(props);

		this.getMailboxList = this.getMailboxList.bind(this);
	}

	getMailboxList() {
		return this.props.mailboxes.map((mailbox) => {
			return (
				<li
					key={mailbox.id}
					onClick={this.props.onSelectMailbox.bind(null, mailbox.id)}>
					<span>{mailbox.emails.length}</span>
					{mailbox.name}
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<ul>
					{this.getMailboxList()}
				</ul>
			</div>
		);
	}
};

MailboxList.propTypes = {
	mailboxes: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		emails: PropTypes.array.isRequired
	})).isRequired,
	onSelectMailbox: PropTypes.func.isRequired
};

export default MailboxList;
