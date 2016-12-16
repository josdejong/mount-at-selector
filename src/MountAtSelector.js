import { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

/**
 * Usage:
 *
 *    <MountAtSelector selector="#myModal">
 *      <div>
 *        I'm rendered inside the #myModal element,
 *        outside of the current React app.
 *      </div>
 *    </MountAtSelector>
 *
 * Properties:
 *
 * - `selector`   A query selector like '#myModal' or a DOM element like
 *                document.getElementById('myModal). You can attach
 *                multiple MountAtSelector components at the same selector.
 *
 */
export default class MountAtSelector extends Component {
  renderedSelector = null
  container = null // the DOM container where the children or MountAtSelector are currently rendered

  render() {
    // don't render anything in the parent component,
    // we will render the children in a separate root
    return null
  }

  renderChildren () {
    const selector = this.getSelector()

    if (this.renderedSelector && selector !== this.renderedSelector) {
      // selector changed. Unmount rendered content at the old selector
      this.unrenderChildren()
      this.renderedSelector = selector
    }

    if (selector) {
      if (!this.container) {
        // create a container inside the selector and render stuff there,
        // so we can create and destroy multiple MountAtSelector components
        // in the same selector.
        this.container = document.createElement('div')
        this.container.className = 'mount-at-selector-container'
        selector.appendChild(this.container)
      }

      render(this.props.children, this.container)
    }
    else {
      console.error('Selector not found in MountAtSelector component')
    }
  }

  unrenderChildren () {
    if (this.renderedSelector) {
      unmountComponentAtNode(this.renderedSelector)
      this.renderedSelector = null
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
      this.container = null
    }
  }

  getSelector() {
    // a query selector like '#myModal'
    if (typeof this.props.selector === 'string') {
      return document.querySelector(this.props.selector)
    }

    // a DOM element like document.getElementById('myModal)
    if (this.props.selector !== undefined) {
      return this.props.selector
    }

    // hm, not good
    return null
  }

  componentDidMount() {
    this.renderChildren()
  }

  componentDidUpdate() {
    this.renderChildren()
  }

  componentWillUnmount() {
    this.unrenderChildren()
  }
}

MountAtSelector.propTypes = {
  selector: function validateSelector (props, propName, componentName) {
    if (typeof props[propName] !== 'string' && props[propName] instanceof Element === false) {
      return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. String or DOM Element expected.'
      )
    }
  }
}

