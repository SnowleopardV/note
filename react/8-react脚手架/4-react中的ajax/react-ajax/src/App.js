import React, { Component } from 'react'
import axios from 'axios'
import GithubUser from './pages/GithubUser'

export default class App extends Component {
  state = { bills: [] }

  componentDidMount() {
    axios
      .get('/bill/billList')
      .then((response) => {
        console.log(11, response.data)
        this.setState({ bills: response.data })
      })
      .catch((error) => console.log(7, error))
  }

  render() {
    return (
      <div>
        <h1>收支情况</h1>
        <div>
          {this.state.bills.map((bill) => (
            <div key={bill.id}>
              {bill.info} --- {bill.mount} ---{' '}
              {bill.direction === '1' ? '收入' : '支出'} ---{bill.time}
            </div>
          ))}
        </div>
        <GithubUser />
      </div>
    )
  }
}
