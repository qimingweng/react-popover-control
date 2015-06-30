import React, {PropTypes} from 'react';

export default class QWContainer extends React.Component {
	static propTypes = {
		width: PropTypes.number.isRequired
	}
	static defaultProps = {
		width: 600
	}
	render() {
		const {width} = this.props;

		return (
      <div style={{width: width, padding: '0 20px', margin: '0 auto'}}>
        {this.props.children}
      </div>
		)
	}
}