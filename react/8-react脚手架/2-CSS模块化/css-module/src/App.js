import React, { Component } from 'react'
// 注意: 这里的{}不是解构赋值, 是按需导入
import Hello from './components/Hello'

export default class App extends Component {
  render() {
    return (
      <div>
        <Hello />
      </div>
    )
  }
}
