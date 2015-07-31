import React, {PropTypes} from 'react';
import Router, {Route} from 'react-router';
import routes from './routes';

require('../css/reset.scss');

export default function(path, props, done) {
	console.log(typeof global);

	Router.run(routes, path, Handler => {
		done(
			'<!doctype html>' +
			React.renderToString(<Handler/>)
		)
	});
}

if (typeof document != 'undefined') {
	Router.run(routes, Router.HashLocation, Handler => {
		React.render(<Handler/>, document);
	});
}
