import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  state = { bills: [] }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:3000/index.html')
      .then((response) => {
        console.log(11, response.data)
        this.setState({ bills: response.data })
      })
      .catch((error) => console.log(7, error))
  }

  render() {
    return (
      <div>
        {/* {this.state.bills.map((bill) => (
          <div key={bill.id}>
            {bill.info} --- {bill.mount} ---{' '}
            {bill.direction === '1' ? '收入' : '支出'} ---{bill.time}
          </div>
        ))} */}
      </div>
    )
  }
}
