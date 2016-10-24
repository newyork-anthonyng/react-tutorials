import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import makeMainRoutes from './views/Main/routes';

const makeRoutes = () => {
	const main = makeMainRoutes();

	return (
		<Route path="">
			{main}
		</Route>
	);
};

export default makeRoutes;
