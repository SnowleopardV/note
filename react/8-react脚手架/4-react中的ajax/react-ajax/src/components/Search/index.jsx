import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'


export default class Search extends Component {

  search = () => {
    PubSub.publish('listStateChange', { isFirst: false, isLoading: true })
    const keyWord = this.keyWordNode.value
    axios.get(`http://api.github.com/search/users?q=${keyWord}`).then(response => {
      PubSub.publish('listStateChange', { users: response?.data?.items, isLoading: false })
    }).catch(error => {
      PubSub.publish('listStateChange', { isFirst: false, isLoading: false, error: error.message })
    })
  }

  render () {
    return (
      <div>
        <input ref={c => this.keyWordNode = c} type="text" placeholder='点击搜索github用户' />
        <button style={{ marginLeft: '10px' }} onClick={this.search}>搜索</button>
      </div>
    )
  }
}
