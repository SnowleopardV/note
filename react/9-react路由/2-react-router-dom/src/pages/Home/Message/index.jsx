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

  routerPush = (id, title) => {
    // 1. params 形式传参
    // this.props.history.push(`/home/message/detail/${id}/${title}`)

    // 2. search 形式传参
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // 3. state 形式传参
    this.props.history.push({
      pathname: '/home/message/detail',
      state: { id, title }
    })
  }

  routerReplace = (id, title) => {
    // 1. params 形式传参
    // this.props.history.replace(`/home/message/detail/${id}/${title}`)

    // 2. search 形式传参
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

    // 3. state 形式传参
    this.props.history.replace({
      pathname: '/home/message/detail',
      state: { id, title }
    })

  }

  render () {
    return (
      <div style={{ backgroundColor: 'green', padding: '20px' }}>
        <h1>Message消息</h1>
        <ul>
          {this.state.messageArr.map((message) => (
            <div key={message.id}>
              <Link
                // 默认为push模式, 设置replace属性, 则为replace模式
                replace
                style={{ display: 'block' }}

                // 1. params方式传递数据 注意这里的模板字符串需要使用{}包一下
                // to={`/home/message/detail/${message.id}/${message.title}`} 

                // 2. search参数方式传递数据
                // to={`/home/message/detail?id=${message.id}&title=${message.title}`}

                // 3、state参数传递数据(注意: 这个不是组件的state), BrowserRouter是基于History的api, history记录了每一次的状态, 所以刷新浏览器, state状态不丢失
                to={{
                  pathname: '/home/message/detail',
                  state: { ...message }
                }}
              >
                {message.title}
              </Link>
              <button onClick={() => this.routerPush(message.id, message.title)}>编程式路由push</button>
              <button onClick={() => this.routerReplace(message.id, message.title)}>编程式路由replace</button>
            </div>
          ))}
        </ul>

        {/* 1. params方式接收数据 */}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail} /> */}

        {/* 2. search方式接收数据 */}
        {/* <Route path="/home/message/detail" component={Detail} /> */}

        {/* 3. state方式接收数据 */}
        <Route path="/home/message/detail" component={Detail} />
      </div>
    )
  }
}
