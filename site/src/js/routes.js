import React, {PropTypes} from 'react';
import Router, {Route} from 'react-router';
import RootPage from './pages/RootPage';

const routes = (
	<Route name="root" path="/" handler={RootPage}>
	</Route>
)

export default routes;