import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  componentDidMount() {
    axios
      .get('http://127.0.0.1:3000/bill/list')
      .then((response) => console.log(7, 'response', response))
      .catch((error) => console.log(7, error))
  }

  render() {
    return <div>App</div>
  }
}
