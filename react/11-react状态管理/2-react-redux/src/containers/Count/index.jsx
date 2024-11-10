import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createIncrement, createDecrement, createScroll } from '../../redux/actions/count'
import './index.css'

class Count extends Component {
  increment = () => {
    this.props.increment(this.selectNode.value)
  }
  decrement = () => {
    this.props.decrement(this.selectNode.value)
  }

  onScroll = (e) => {
    console.log(e.target.scrollTop)
    this.props.scroll(e.target.scrollTop)
  }

  render () {
    return (
      <div className='scroll-container' onScroll={this.onScroll}>
        <div className='scroll-body'>
          <h1>这个是Count组件</h1>
          <h3>结果为{this.props.count}, 总人数为{this.props.persons.length}</h3>
          <select ref={c => this.selectNode = c}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button>异步+</button>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({ count: state.count, persons: state.persons }), {
  increment: createIncrement,
  decrement: createDecrement,
  scroll: createScroll
})(Count)
// connect(mapStateToProps, mapActionsToProps)(Count)
