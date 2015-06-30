# A good popover...

- Flips when it is too low on screen
- Nudges left when it is too far right on screen
- Responds to clicks outside of its bounds
- Responds to keyboard shortcuts like ESC

# Usage

```javascript
import Popover from 'react-popover-control';

actions = [
  {
    title: 'Edit',
    func: () => {
      ...
    }
  },
  {
    title: 'Delete',
    func: () => {
      ...
    }
  }
];

class Page extends React.Component {
  render() {
    return (
      <Popover actions={actions}>
        <a>Click Here</a>
      </Popover>
    )
  }
}
```