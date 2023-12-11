import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'


export default class Search extends Component {

  search = () => {
    PubSub.publish('listStateChange', { isFirst: false, isLoading: true })
    const keyWord = this.keyWordNode.value
    // axios 写法
    // axios.get(`http://api.github.com/search/users?q=${keyWord}`).then(response => {
    //   PubSub.publish('listStateChange', { users: response?.data?.items, isLoading: false })
    // }).catch(error => {
    //   PubSub.publish('listStateChange', { isFirst: false, isLoading: false, error: error.message })
    // })

    // fetch写法, 原生API, 关注分离的思想
    fetch(`http://api.github.com/search/users?q=${keyWord}`).then(response => {
      console.log(20, response)
      return response.json() // 这里需要返回response.json()
    }
      // , error => {
      //   console.log(22, error.toString())
      // }
    ).then(res => {
      // 服务器连接正常
      console.log(26, res)
      PubSub.publish('listStateChange', { users: res?.items, isLoading: false })
    }).catch(error => {
      // 这里的catch表示服务器连接异常
      console.log(27, error.toString())
      PubSub.publish('listStateChange', { isLoading: false, error: error.toString() })
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
