import React, { Component } from 'react';
import './Modal.css';
import MountAtSelector from './MountAtSelector'

export default class Modal extends Component {
  render() {
    return <MountAtSelector selector="#myModal">
      <div className="modal" >
        <div className="modal container">
          {this.props.children}
        </div>
      </div>
    </MountAtSelector>
  }
}
