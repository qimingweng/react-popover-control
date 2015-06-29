import React, {PropTypes} from 'react';
import Container from '../components/Container.react';
import QWHeader from '../../commons/components/QWHeader';

export default class HomePage extends React.Component {
	render() {
		return (
			<div id="home-page">
				<QWHeader 
					name="React Popover Control"
					description="A simple, idiomatic popover control for React"/>
			</div>
		)
	}
}