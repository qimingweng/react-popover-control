import React, {PropTypes} from 'react';
import {debounce, map} from 'lodash';
import keycode from 'keycode';
import EventStack from 'active-event-stack';
let useSheet;

if (typeof window === 'undefined') {
  useSheet = x => x => x;
} else {
  useSheet = require('./useSheet');
}

const PopoverActionsType = PropTypes.arrayOf(PropTypes.shape({
  title: PropTypes.string.isRequired,
  func: PropTypes.func
}));

export default class PopoverControl extends React.Component {
  static propTypes = {
    actions: PopoverActionsType.isRequired,
    className: PropTypes.string
  }
  state = {
    isPopped: false
  }
  getPopoverReferenceFrame = () => {
    let node = React.findDOMNode(this.refs.self);
    return node.getBoundingClientRect();
  }
  shouldHidePopover = () => this.setState({isPopped: false})
  handleDocumentClick = (event) => {
    const {target} = event;
    const node = React.findDOMNode(this);
    if (target == node || node.contains(target)) {
      return;
    } else {
      this.shouldHidePopover();
    }
  }
  onClick = () => {
    this.updateChildFrameInfo();
    this.setState({isPopped: !this.state.isPopped});
  }
  updateChildFrameInfo = () => {
    const {top, left, width, height} = React.findDOMNode(this).getBoundingClientRect();
    this.setState({top, left, width, height});
  }
  componentDidMount = () => {
    this._debouncedScroll = debounce(() => {
      if (this.state.isPopped) {
        this.updateChildFrameInfo();
      }
    }, 100);

    document.addEventListener('scroll', this._debouncedScroll, true);
    window.addEventListener('resize', this._debouncedScroll);
  }
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this._debouncedScroll, true);
    window.removeEventListener('resize', this._debouncedScroll);
  }
  render = () => {
    const {top, left, width, height} = this.state;

    let popoverControlStyle = {
      position: 'relative'
    }

    return (
      <div className={this.props.className}
        style={popoverControlStyle}>
        <div ref="self"
          onClick={this.onClick}>
          {this.props.children}
        </div>
        {this.state.isPopped ?
          <PopoverList
            parentFrame={{top, left, width, height}}
            actions={this.props.actions}
            offsetY={this.props.offsetY}
            delegate={this}/>
        : null}
      </div>
    )
  }
}

const PopoverListStyles = {
  base: {
  	backgroudColor: 'white',
  	minWidth: 150,
  	overflow: 'hidden',
  	boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  	borderRadius: 5
  },
  item: {
    display: 'block',
    height: 40,
    lineHeight: 40,
    padding: '0 10px',
    color: '#1A2D36',
    '&:hover': {
      textDecoration: 'none',
      color: '#1A2D36',
      backgroundColor: '#e1f0f7',
    }
  }
};

@useSheet(PopoverListStyles)
class PopoverList extends React.Component {
  static propTypes = {
    actions: PopoverActionsType.isRequired,
    delegate: PropTypes.shape({
      shouldHidePopover: PropTypes.func.isRequired,
      getPopoverReferenceFrame: PropTypes.func.isRequired
    }).isRequired,
    windowMargin: PropTypes.number.isRequired,
    launcherMargin: PropTypes.number.isRequired
  }
  static defaultProps = {
    windowMargin: 20,
    launcherMargin: 10
  }
  state = {
    offsetX: 0,
    isFlipped: false, // usually bottom facing, but if true, then the popover should appear above
  }
  componentDidMount() {
    this.eventToken = EventStack.addListenable([
      ['click', this.props.delegate.handleDocumentClick],
      ['keydown', this.onKeyDown]
    ]);

    // Once the element is in the dom, we can measure its height
    const {width, height} = React.findDOMNode(this).getBoundingClientRect();
    this.setState({width, height});
  }
  componentWillUnmount() {
    EventStack.removeListenable(this.eventToken);
  }
  onKeyDown = (event) => {
    if (keycode(event) === 'esc') {
      this.props.delegate.shouldHidePopover();
    }
  }
  onActionClick = (action) => {
    if (typeof action.func === 'function') action.func();
    this.props.delegate.shouldHidePopover();
  }
  render() {
    const {props: {sheet: {classes}}} = this;
    const {windowMargin, launcherMargin, parentFrame, actions} = this.props;
    const {width, height} = this.state;

    const windowFrame = {
      width: (typeof document != 'undefined') ? document.documentElement.clientWidth : 0,
      height: (typeof document != 'undefined') ? document.documentElement.clientHeight : 0
    };

    // State
    let offsetY = parentFrame.height + launcherMargin,
      offsetX = 0;

    // Flipping
    if ((parentFrame.top + parentFrame.height + height + windowMargin + launcherMargin) > windowFrame.height) {
      offsetY = 0 - height - launcherMargin;
    }

    // Offset X
    if ((parentFrame.left + width + windowMargin) > windowFrame.width)
      offsetX = (windowFrame.width - width - windowMargin) - parentFrame.left;

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate(${offsetX}px, ${offsetY}px)`
    };

    return (
      <div style={style} ref="self" className={classes.base}>
        {map(actions, (action, i) =>
          <a key={i}
            onClick={this.onActionClick.bind(null, action)}
            className={classes.item}>
            {action.title}
          </a>
        )}
      </div>
    )
  }
};
