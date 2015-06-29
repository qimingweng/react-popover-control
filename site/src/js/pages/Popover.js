import React, {PropTypes} from 'react';
import classNames from 'classnames';
import _, {debounce} from 'lodash';
import keycode from 'keycode';

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
  onClick = () => this.setState({isPopped: !this.state.isPopped})
  onScroll = (event) => {
    const frame = React.findDOMNode(this).getBoundingClientRect();
  }
  componentDidMount = () => {
    this._debouncedScroll = debounce(this.onScroll, 50);

    document.addEventListener('scroll', this._debouncedScroll, true);
    window.addEventListener('resize', this._debouncedScroll);
  }
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this._debouncedScroll, true);
    window.removeEventListener('resize', this._debouncedScroll);
  }
  render = () => {
    let popoverControlStyle = {
      position: 'relative'
    }

    const className = classNames('ui-popover-control', this.props.className);

    return (
      <div className={className}
        style={popoverControlStyle}>
        <div ref='self' 
          onClick={this.onClick}>
          {this.props.children}
        </div>
        {this.state.isPopped ?
          <PopoverList 
            actions={this.props.actions}
            offsetY={this.props.offsetY}
            delegate={this}/>
        : null}
      </div>
    )
  }
}

class PopoverList extends React.Component {
  static propTypes = {
    actions: PopoverActionsType.isRequired,
    delegate: PropTypes.shape({
      shouldHidePopover: PropTypes.func.isRequired,
      getPopoverReferenceFrame: PropTypes.func.isRequired
    }).isRequired,
    margin: PropTypes.number.isRequired
  }
  static defaultProps = {
    margin: 20
  }
  state = {
    offsetX: 0,
    isFlipped: false, // usually bottom facing, but if true, then the popover should appear above
  }
  componentDidMount() {
    // Debounce the onScroll event, so that render isn't called too many ties
    this._debouncedScroll = _.debounce(this.onScroll, 50);

    // This is cool, the 3rd argument true capture scroll events at capture (before it bubbles)
    // Otherwise, scroll events don't bubble from inner containers
    document.addEventListener('scroll', this._debouncedScroll, true);
    window.addEventListener('resize', this._debouncedScroll);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('click', this.onDocumentClick);

    // Get size reference size of the target, and then position the element
    let {width, height} = this.props.delegate.getPopoverReferenceFrame();
    this.setState({
      referenceSize: {width, height}
    }, function() {
      this.positionSizeRelativeToWindow();
    });
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this._debouncedScroll, true);
    window.removeEventListener('resize', this._debouncedScroll);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('click', this.onDocumentClick);
  }
  onScroll = (event) => {
    // When either the scroll position has changed, or the window has resized, check the bounds of the list and possibly reposition it
    this.positionSizeRelativeToWindow();
  }
  positionSizeRelativeToWindow = () => {
    const {width, height} = React.findDOMNode(this).getBoundingClientRect();
    const {top, left} = this.props.delegate.getPopoverReferenceFrame();
    const parentFrame = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };

    // State
    let isFlipped = false, offsetX = 0;

    // Flipping
    if ((top + height + this.props.margin) > parentFrame.height)
      isFlipped = true;

    // Offset X
    if ((left + width + this.props.margin) > parentFrame.width)
      offsetX = (parentFrame.width - width - this.props.margin) - left;

    // Set state
    this.setState({isFlipped, offsetX});
  }
  onDocumentClick = (event) => {
    let selfNode = React.findDOMNode(this.refs.self);
    if (!selfNode) return;
    if (event.target !== selfNode && !selfNode.contains(event.target)) {
      this.props.delegate.shouldHidePopover();
    }
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
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      // [this.state.isFlipped ? 'bottom' : 'top']
      //   : (this.state.referenceSize ? this.state.referenceSize.height : 0) 
      //   + this.props.offsetY,
      transform: `translate(${this.state.offsetX}px, 0)`
    }

    const {actions} = this.props;

    return (
      <div style={style} ref="self" className="ui-popover-list">
        {_.map(actions, (item, i) =>
          <a key={i} onClick={this.onActionClick.bind(null, item)}>
            {item.title}
          </a>
        )}
      </div>
    )
  }
}