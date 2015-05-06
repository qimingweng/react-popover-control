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
		return (
			<div>
				<h1>React Popover Control</h1>
				<div class="post-area">
					<PopoverControl/>
				</div>
			</div>
		)
	}
});

React.render(<App/>, mountNode);