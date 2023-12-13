import React, { Component } from 'react'
import store from '../../redux/store'
import { createIncrement, createDecrement } from '../../redux/count_action'

export default class Count extends Component {

  increment = () => {
    const { value } = this.selectNode
    store.dispatch(createIncrement(value))
  }

  decrement = () => {
    const { value } = this.selectNode
    store.dispatch(createDecrement(value))
  }

  incrementBySyncAction = () => {
    const { value } = this.selectNode
    setTimeout(() => { store.dispatch(createIncrement(value)) }, 1000)
  }

  render () {
    return (
      <div>
        <h1>计算结果 {store.getState()}</h1>
        <select ref={c => this.selectNode = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> <br /><br />
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementBySyncAction}>异步加法 (使用同步action)</button>
        {/* 待完善 */}
        <button>异步加法 (使用异步action)</button>
      </div>
    )
  }

  // componentDidMount () {
  //   // redux只负责维护状态, 不负责更新界面, 需要使用store.subscribe去监听状态的变化
  //   store.subscribe(() => this.setState({}))
  // }
}
