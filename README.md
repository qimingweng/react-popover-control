# React Popover Control

[![npm](https://img.shields.io/npm/v/react-popover-control.svg?style=flat-square)](https://www.npmjs.com/package/react-popover-control)

## Demo

[Check out the demo](http://qimingweng.github.io/react-popover-control)

## Download

```bash
npm install react-popover-control
```

## Usage

```javascript
import Popover from 'react-popover-control';

const actions = [
  {
    title: 'Edit',
    func() {
      // some action here
    }
  },
  {
    title: 'Delete',
    func() {
      // some action here
    }
  }
];

class Page extends React.Component {
  render() {
    return (
      <div>
        Some component...

        <Popover actions={actions}>
          <a>Click Here</a>
        </Popover>
      </div>
    )
  }
};
```

## Styling

Default styles are included as jss, but you can opt out by... (TODO)

## A good popover...

- Flips when it is too low on screen
- Nudges left when it is too far right on screen
- Responds to clicks outside of its bounds
- Responds to keyboard shortcuts like ESC

## Things still missing

- Arrow key control
- Scrolling when there are too many items
- Using keyboard letters as shortcuts to certain fields
- Filtering items with an input field
