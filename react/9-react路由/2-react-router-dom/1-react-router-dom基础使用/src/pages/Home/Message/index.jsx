import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class News extends Component {
  state = {
    messageArr: [
      { id: '1', title: '中国赢啦' },
      { id: '2', title: '轰20首飞啦' },
      { id: '3', title: '福建舰下水啦' },
    ],
  }
  render () {
    return (
      <div style={{ backgroundColor: 'green', padding: '20px' }}>
        <h1>Message消息</h1>
        <ul>
          {this.state.messageArr.map((message) => (
            <Link
              style={{ display: 'block' }}
              key={message.id}
              // 注意这里的模板字符串需要使用{}包一下
              to={`/home/message/detail/${message.id}/${message.title}`}
            >
              {message.title}
            </Link>
          ))}
        </ul>
        <Route path="/home/message/detail/:id/:title" component={Detail} />
      </div>
    )
  }
}
