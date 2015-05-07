import React, {PropTypes} from "react";
import PopoverControl from "react-popover-control";

const mountNode = document.getElementById("react-app");
const App = React.createClass({
	render() {
		let actions = [
			{
				title: "Edit"
			},
			{
				title: "Delete"
			},
			{
				title: "Change the world"
			}
		];

		return (
			<div className="container">
				<h1>React Popover Control</h1>
				<div className="post-view">
					This is a popover. Click the little arrow at the bottom right to see more actions.
					<div className="popover-position-wrap">
						<PopoverControl actions={actions}/>
					</div>
				</div>

				<div className="post-view">
					When the popover doesn't have enough space below it, it will show up above the target.
					<div className="popover-position-wrap">
						<PopoverControl actions={actions}/>
					</div>
				</div>

				<div className="post-view">
					When the popover doesn't have enough space to the right of it, it will shift itself left and keep a margin to the end of the page.
					<div className="popover-position-wrap">
						<PopoverControl actions={actions}/>
					</div>
				</div>
			</div>
		)
	}
});

React.render(<App/>, mountNode);