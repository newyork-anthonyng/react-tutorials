import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import makeRoutes from './routes';
import 'font-awesome/css/font-awesome.css';
import App from './containers/App/App';
import './app.css';

const routes = makeRoutes();

ReactDOM.render(
	<App history={browserHistory} routes={routes} />,
	document.querySelector('#root')
);
