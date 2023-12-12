import React, { Component } from 'react'
// import qs from 'query-string'

export default class Detail extends Component {
  state = {
    messages: [{
      id: '1',
      content: '中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦中国赢啦'
    }, {
      id: '2',
      content: '轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦轰20首飞啦'
    }, {
      id: '3',
      content: '福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦福建舰下水啦'
    }]
  }
  render () {
    // 1. params 参数传递数据
    // const { id, title } = this.props.match.params

    // 2. search 参数传递数据
    // const { id, title } = qs.parse(this.props.location.search.slice(1))

    // 3. state 参数传递数据
    console.log(25, this.props.location)
    const { id, title } = this.props.location.state || {}

    const content = (this.state.messages.find((message) => message.id === id))?.content || ''

    return (
      <div>
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
    )
  }
}
