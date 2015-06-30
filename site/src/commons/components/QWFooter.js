import React, {PropTypes} from 'react';
import QWContainer from './QWContainer';

require('../css/QWFooter.scss');

export default class QWFooter extends React.Component {
	static propTypes = {
		
	}
	static contextTypes = {
		router: PropTypes.func
	}
	componentDidMount() {

	}
	componentWillUnmount() {
		
	}
	render() {
		return (
			<footer id="QWFooter">
				<QWContainer>
					<a href="http://www.qimingweng.com">&copy; 2015 Qiming Weng</a>
				</QWContainer>
			</footer>
		)
	}
}