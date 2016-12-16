import React, { Component } from 'react'
import './Demo.css'
import Modal from './Modal'

export default class Demo extends Component {
  state = {
    showModal: false
  }

  render() {
    return <div className="content">
      <p>
        Content 1
      </p>
      <p>
        <input type="button" value="Show modal..." onClick={this.showModal} />
      </p>

      {
        this.renderModal()
      }

    </div>
  }

  renderModal () {
    if (this.state.showModal) {
      return <Modal>
        <p>
          I'm a modal.
        </p>
        <p>
          <input type="button" value="Close me" onClick={this.hideModal} />
        </p>
      </Modal>
    }
    else {
      return null
    }
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  hideModal = () => {
    this.setState({ showModal: false })
  }
}
