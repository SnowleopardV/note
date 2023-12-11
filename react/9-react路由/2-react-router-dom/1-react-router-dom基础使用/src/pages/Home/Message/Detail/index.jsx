import React, { Component } from 'react'

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
    const { id, title } = this.props.match.params
    const content = (this.state.messages.find((message) => message.id === id)).content
    console.log(17, this.props.match.params, id, title)
    return (
      <div>
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
    )
  }
}
