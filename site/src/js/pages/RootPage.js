// RootPage
import React, {PropTypes} from 'react';
import {RouteHandler} from 'react-router';

export default class RootPage extends React.Component {
	static contextTypes = {
		router: PropTypes.func
	}
	render() {
		const initialProps = {
			__html: JSON.stringify(this.props)
		}

		return (
			<html>
				<head>
					<title>Title</title>
					<link rel="stylesheet" href="/style.css"/>

					<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>

					<script src="//use.typekit.net/mak3sgg.js"></script>
					<script>{`try{Typekit.load();}catch(e){}`}</script>

					<meta charSet="utf-8"/>
					<meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
				</head>
				<body>
					<RouteHandler/>
					<script id="initial-props"
						type="application/json"
						dangerouslySetInnerHTML={initialProps}/>
					<script src="/bundle.js"/>
				</body>
			</html>
		)
	}
}