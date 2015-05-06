import React, {PropTypes} from "react";
import PopoverControl from "react-popover-control";

const mountNode = document.getElementById("react-app");
const App = React.createClass({
	propTypes: {

	},
	componentDidMount() {

	},
	componentDidUpdate() {

	},
	componentWillUnmount() {
		
	},
	render() {
		let actions = [];

		return (
			<div>
				<h1>React Popover Control</h1>
				<div className="post-area">
					<PopoverControl actions={actions}/>
				</div>
			</div>
		)
	}
});

React.render(<App/>, mountNode);