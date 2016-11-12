import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const emails = [
	{ id: '123', from: 'Anthony', to: 'Gaby', subject: 'Hello' },
	{ id: '124', from: 'Gaby', to: 'Anthony', subject: 'Goodbye' },
	{ id: '125', from: 'Anthony', to: 'Gaby', subject: 'Hello again' },
];
const emails1 = [
	{ id: '1213', from: 'Jose', to: 'Gaby', subject: 'Hello' },
	{ id: '1214', from: 'Jose', to: 'Anthony', subject: 'Goodbye' },
	{ id: '1215', from: 'Jose', to: 'Gaby', subject: 'Hello again' },
	{ id: '1216', from: 'Jose', to: 'Gaby', subject: 'Hello again' },
];
const mailboxes = [
	{ id: '123', name: 'Inbox', emails: emails },
	{ id: '124', name: 'Favorites', emails: emails1 },
];

ReactDOM.render(
  <App mailboxes={mailboxes} />,
  document.getElementById('root')
);
