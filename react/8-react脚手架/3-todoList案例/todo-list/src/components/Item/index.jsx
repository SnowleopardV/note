import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export default class Item extends Component {

  state = {
    mouseIn: false
  }

  static propTypes = {
    deleteTodo: PropTypes.func.isRequired
  }

  update = (id) => {
    const { updateTodo } = this.props
    return e => updateTodo(id, e.target.checked)
  }

  removeTodo = (id) => {
    if (!window.confirm('确认是要删除吗?')) return

    const { deleteTodo } = this.props
    deleteTodo(id)
  }

  isMounseIn = (flag) => () => this.setState({ mouseIn: flag })

  render () {
    const { id, matter, done } = this.props

    return (
      <div className={styles.todoItemWrap} style={{ background: this.state.mouseIn ? '#e5e5e5' : '#ffffff' }} onMouseEnter={this.isMounseIn(true)} onMouseLeave={this.isMounseIn(false)}>
        <div className={styles.matterWrap}>
          <input type="checkbox" checked={done} onChange={this.update(id)} />
          <span>{matter}</span>
        </div>
        <button className={styles.deleteBtn} style={{ display: this.state.mouseIn ? 'block' : 'none' }} onClick={() => this.removeTodo(id)}>删除</button>
      </div>
    )
  }
}
