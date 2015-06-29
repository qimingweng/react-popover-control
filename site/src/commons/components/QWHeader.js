import React, {PropTypes} from 'react';
import QWContainer from './QWContainer';

require('../css/QWHeader.scss');

export default class QWHeader extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		description: PropTypes.string
	}
	render() {
		return (
			<header id="QWHeader">
				<QWContainer>
					<h1>{this.props.name}</h1>
					<h2>{this.props.description}</h2>
					<div>
						<a>Github</a>
					</div>
				</QWContainer>
			</header>
		)
	}
}