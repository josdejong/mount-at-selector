# MountAtSelector

This React component allows rendering components like a Modal outside the main React app.

Inspired by a blog of Komand Tech: https://blog.komand.com/how-to-render-components-outside-the-main-react-app


# Install

```
npm install --save MountAtSelector
```


# Use

Create an extra container like `#myModal` in your HTML:


```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>MountAtSelector demo</title>
  </head>
  <body>
    <div id="myModal"></div>

    <div id="app"></div>
  </body>
</html>
```

Create a `MountAtSelector` component in your React app:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>
    <p>
      Content rendered inside the React app...
    </p>

    <MountAtSelector selector="#myModal">
      <div>
        I'm rendered inside the #myModal element,
        outside of the React app.
      </div>
    </MountAtSelector>
  </div>,
  document.getElementById('app')
)
```

# Demo

See the folder `/src` for a full demo. To run the demo, clone the git project
and run `npm install; npm start` in the root of the project.


# API

```
<MountAtSelector selector={string | Element}>
```

Properties:

  - `selector`<br>
    A query selector like `'#myModal'` or a DOM element like
    `document.getElementById('myModal)`. You can attach
    multiple `MountAtSelector` components at the same selector.


# License

MIT