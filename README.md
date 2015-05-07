# React Popover Control
A popover control for React.js, [see it in action](http://qimingweng.github.io/react-popover-control/).

## This project is very new

Until version `0.1.0`, expect there to be lots of breaking changes. If you're curious, I encourage you to look at the code, it's not very complex, so perhaps use it as inspiration for your own component if you need it to work exactly the way you want. I'm building customizability as I go.

## Download

To quickly download this project, use npm. `npm install react-popover-control`

## Usage

```javascript
import PopoverControl from "react-popover-control";

let SomeComponent = React.createClass({
  render() {
    let actions = [
      {
        title: "Edit",
        func: function() {...}
      },
      {
        title: "Delete",
        func: function() {...}
      },
      {
        title: "Change the World",
        func: function() {...}
      }
    ];

    return (
      <div>
        <PopoverControl actions={actions}/>
      </div>
    )
  }
});

...

```

(Does this look weird if you're developing for web? Well that's because it's in ES6 and I use browserify and babel to compile and bundle it all up. They are cool tools)

## Help

If something's wrong or if you have a question, tweet me [@qiming](https://twitter.com/qiming)

# What is a popover control?

Basically, click a button and then a list of actionable items show up.

I could not find a good popover control resource or a good tutorial on how to write a (good) popover control.

A simple popover control simply shows up, but a good popover control adapts to its environment.

Here are a few things I needed a popover to do.

1. Hide when the ESC key is pressed
2. Hide when a user clicks outside of its bounds
3. Hide when a user clicks the original link that opened it
4. Adapt to be below the link or above the link depending on the scroll position of the page (or the height of the page)
5. Shift left or right depending on the horizontal scroll position of the page (or the width of the page)

I also like React (reactjs), but there are lots of good articles out there for why React is really cool.

So I wrote a popover control in React.

It has two major parts.

1. A controller which manages the link that opens the list, and also displays the list within its hierarchy (but absolutely positioned and overflowing)
2. A list, which takes a list of actions, renders them, figures out if it needs to adjust its size and position on screen, and responds to events like clicks and keyboard clicks

# Things Missing in a Great Popover Controller

PopoverControl is good, but here are some things I can think of that would make it great

1. Arrow keys and return to navigate between list items
2. Possibly adaptable to a dropdown controller (a list of searchable items that you can select from)