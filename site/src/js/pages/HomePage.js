import React, {PropTypes} from 'react';
import QWContainer from '../../commons/components/QWContainer';
import QWHeader from '../../commons/components/QWHeader';
import QWFooter from '../../commons/components/QWFooter';
import marked from 'marked';
import customMarkedRenderer from '../customMarkedRenderer';

import Popover from 'react-popover-control';

require('../../css/HomePage.scss')

const HomePageMarkdown = require('../markdown/HomePage.md');

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
					description="A simple, idiomatic popover control for React"
					github="https://github.com/qimingweng/react-popover-control"/>

				<div id="main">
					<QWContainer>
						<section className="popover-wrap">
							<h1>Try this example</h1>

							<Popover actions={exampleActions} className="demo-popover">
			          <a className="demo-popover-button">
			          	<span className="fa fa-angle-down"/>
			          </a>
							</Popover>
						</section>

						<div dangerouslySetInnerHTML={{
							__html: marked.parse(HomePageMarkdown, {renderer: customMarkedRenderer})
						}}/>
					</QWContainer>
				</div>

				<QWFooter/>
			</div>
		)
	}
}
