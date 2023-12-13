import React, { Component } from 'react'
// 注意: 这里的{}不是解构赋值, 是按需导入
import Count from './components/Count'
import Welcome from './components/Welcome'

export default class App extends Component {
  state = { showCount: true }

  unMountCount = () => this.setState({ showCount: false })

  render() {
    return (
      <>
        {this.state.showCount ? <Count /> : null}
        <Welcome />
        <button onClick={this.unMountCount}>点击卸载Count组件</button>
      </>
    )
  }
}
