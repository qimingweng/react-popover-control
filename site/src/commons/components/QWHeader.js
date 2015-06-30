import React, {PropTypes} from 'react';
import QWContainer from './QWContainer';

require('../css/QWHeader.scss');

export default class QWHeader extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		description: PropTypes.string,
		github: PropTypes.string // github url
	}
	render() {
		const {name, description, github} = this.props;

		return (
			<header id="QWHeader">
				<QWContainer>
					<h1>{name}</h1>
					<h2>{description}</h2>
					<div>
						{github ?
							<a href={github}>Github</a>
						: null}
					</div>
				</QWContainer>
			</header>
		)
	}
}