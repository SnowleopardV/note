import React, { Component } from 'react'
import Todos from './pages/Todos'

export default class App extends Component {
  componentDidMount() {
    console.log(7, 'componentDidMount')
  }

  render() {
    return (
      <div>
        <Todos />
      </div>
    )
  }
}
