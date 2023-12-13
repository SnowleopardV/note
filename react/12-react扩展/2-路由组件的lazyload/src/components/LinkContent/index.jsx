import React, { Component } from 'react'

export default class LinkContent extends Component {
  render () {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
      </div>
    )
  }
}
