import React, {PropTypes} from 'react';
import QWContainer from '../../commons/components/QWContainer';
import QWHeader from '../../commons/components/QWHeader';

import Popover from './Popover';

const exampleActions = [
	{
		title: 'Edit',
		func() {

		}
	},
	{
		title: 'Delete',
		func() {

		}
	}
];

export default class HomePage extends React.Component {
	render() {
		return (
			<div id="home-page">
				<QWHeader 
					name="React Popover Control"
					description="A simple, idiomatic popover control for React"/>

				<QWContainer>
					<Popover actions={exampleActions} className="hi">
						<a className="ui-popover-control-button">
		          <span className="fa fa-angle-down"/>
		        </a>
					</Popover>
				</QWContainer>
			</div>
		)
	}
}