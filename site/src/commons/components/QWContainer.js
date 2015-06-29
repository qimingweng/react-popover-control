import React, {PropTypes} from 'react';

export default class QWContainer extends React.Component {
	render() {
		return (
      <div style={{width: 600, padding: '0 20px', margin: '0 auto'}}>
        {this.props.children}
      </div>
		)
	}
}