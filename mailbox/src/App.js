import React, { Component } from 'react';
import './App.css';
import Mailbox from './Mailbox';
import MailboxList from './MailboxList';
import NoneSelected from './NoneSelected';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mailbox_id: null
		};

		this.handleSelectMailbox = this.handleSelectMailbox.bind(this);
	}

	handleSelectMailbox(id) {
		console.log('clicked on mailbox: ' + id);
		this.setState({
			mailbox_id: id
		});
	}

	render() {
		const { mailbox_id } = this.state;
		let selectedMailbox;
		if(mailbox_id) {
			const mailbox = this.props.mailboxes.filter((mailbox) => {
				return mailbox.id === mailbox_id;
			})[0];
			selectedMailbox = <Mailbox emails={mailbox.emails} />;
		} else {
			selectedMailbox = <NoneSelected text="mailbox" />;
		}

		return (
			<div className="App">
				<MailboxList
					mailboxes={this.props.mailboxes}
					onSelectMailbox={this.handleSelectMailbox} />
				<div>
					{selectedMailbox}
				</div>
			</div>
		);
	}
}

export default App;
