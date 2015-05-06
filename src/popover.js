import React, {PropTypes} from "react";
import classNames from "classnames";
import _ from "lodash";
let PureRenderMixin = require("react/addons").addons.PureRenderMixin;

let PopoverActionsType = PropTypes.arrayOf(PropTypes.shape({
	title: PropTypes.string.isRequired,
	func: PropTypes.func
}));

/*
	Some terminologyf
	target: the button that, when clicked, opens the list
	list: a list of actions which are normally hidden
*/

const PopoverControl = React.createClass({
	propTypes: {
		actions: PopoverActionsType.isRequired,
		/// In pixels, the offset between the target and the list (in the y direction), including the height of the target itself
		offsetY: PropTypes.number.isRequired
	},
	getDefaultProps() {
		return {
			offsetY: 5
		}
	},
	getInitialState() {
		return {
			// Must be initialized with false
			isPopped: false
		}
	},
	shouldHidePopover(event) {
		// @PopoverListDelegate
		this.setState({
			isPopped: false
		});
	},
	getPopoverReferenceFrame() {
		// @PopoverListDelegate
		let node = React.findDOMNode(this.refs.self);
		return node.getBoundingClientRect();
		// @return {top: Number, left: Number}
	},
	onClick() {
		this.setState({
			isPopped: !this.state.isPopped
		});
	},
	render() {
		return (
			<div className="popover-control" height={this.props.height}>
				<a className="popover-control-button" ref="self" onClick={this.onClick}>
					{/* using font awesome here, will think about introducing flexibility at the interface level */}
					<span className="fa fa-angle-down"/>
				</a>
				{this.state.isPopped ?
					<PopoverList 
						ref="popover"
						actions={this.props.actions}
						offsetY={this.props.offsetY}
						delegate={this}/>
				: null}
			</div>
		)
	}
});

const PopoverList = React.createClass({
	mixins: [PureRenderMixin],
	propTypes: {
		actions: PopoverActionsType.isRequired,
		delegate: PropTypes.shape({
			shouldHidePopover: PropTypes.func.isRequired,
			getPopoverReferenceFrame: PropTypes.func.isRequired
		}).isRequired,
		margin: PropTypes.number.isRequired,
		offsetY: PropTypes.number.isRequired
	},
	getDefaultProps() {
		return {
			margin: 20
		}
	},
	getInitialState() {
		return {
			offsetX: 0,
			isFlipped: false, // usually bottom facing, but if true, then the popover should appear above
		}
	},
	componentDidMount() {
		// debounce the onScroll event
		this.onScroll = _.debounce(this.onScroll, 50);

		// This is cool, the 3rd argument true capture scroll events at capture (before it bubbles)
		// Otherwise, scroll events don't bubble from inner containers
		document.addEventListener("scroll", this.onScroll, true);
		window.addEventListener("resize", this.onScroll);
		document.addEventListener("keydown", this.onKeyDown);
		document.addEventListener("click", this.onDocumentClick);

		// Get size reference size of the target, and then position the element
		let {width, height} = this.props.delegate.getPopoverReferenceFrame();
		this.setState({
			referenceSize: {width, height}
		}, function() {
			this.positionSizeRelativeToWindow();
		});
	},
	componentWillUnmount() {
		document.removeEventListener("scroll", this.onScroll, true);
		window.removeEventListener("resize", this.onScroll);
		document.removeEventListener("keydown", this.onKeyDown);
		document.removeEventListener("click", this.onDocumentClick);
	},
	onScroll(event) {
		this.positionSizeRelativeToWindow();
	},
	positionSizeRelativeToWindow() {
		let node = React.findDOMNode(this);
		let {width, height} = node.getBoundingClientRect();
		let {top, left} = this.props.delegate.getPopoverReferenceFrame();
		let parentFrame = {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}

		// Find the appropriate (theoretical) top position of the list
		top += this.state.referenceSize.height + this.props.offsetY;

		// State
		let isFlipped = false,
			offsetX = 0;

		// Flipping
		if (top + height + this.props.margin > parentFrame.height) {
			isFlipped = true;
		}

		// Offset X
		if (left + width + this.props.margin > parentFrame.width) {
			offsetX = (parentFrame.width - width - this.props.margin) - left;
		}

		// Set state
		this.setState({isFlipped, offsetX});
	},
	onDocumentClick(event) {
		let selfNode = React.findDOMNode(this.refs.self);
		if (!selfNode) return;
		if (event.target !== selfNode && !selfNode.contains(event.target)) {
			this.props.delegate.shouldHidePopover();
		}
	},
	onKeyDown(event) {
		if (event.which === 27) { // ESC
			this.props.delegate.shouldHidePopover();
		}
	},
	onActionClick(action) {
		if (typeof action.func === "function") action.func();
		this.props.delegate.shouldHidePopover();
	},
	render() {
		let style = {
			position: "absolute",
			zIndex: 1000,
			[this.state.isFlipped ? "bottom" : "top"]
				: (this.state.referenceSize ? this.state.referenceSize.height : 0) 
				+ this.props.offsetY,
			transform: `translate(${this.state.offsetX}px, 0)`
		}
		return (
			<div style={style} ref="self" className={classNames("popover-list", {
				"is-flipped": this.state.isFlipped
			})}>
				{_.map(this.props.actions, (item, i) =>
					<a key={i} onClick={this.onActionClick.bind(null, item)}>{item.title}</a>)}
			</div>
		)
	}
});

module.exports = PopoverControl;