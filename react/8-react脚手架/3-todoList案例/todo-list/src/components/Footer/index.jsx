import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export default class Footer extends Component {
  static propTypes = {
    todos: PropTypes.array,
    clearAllDone: PropTypes.func
  }

  toggleAllDone = (e) => {
    const { updateAllDoneStatus } = this.props
    updateAllDoneStatus(e.target.checked)
  }

  removeAllDone = () => {
    const { clearAllDone } = this.props

    clearAllDone()
  }

  render () {
    const { todos } = this.props
    const doneCount = todos.reduce((pre, todo) => todo.done ? pre + 1 : pre, 0)
    const allCount = todos.length

    return (
      <div className={styles.footer}>
        <input type="checkbox" checked={doneCount === allCount && allCount > 0} onChange={this.toggleAllDone} />
        <div className={styles.count}>
          <span>已完成{doneCount}</span>/
          <span>全部 {allCount}</span>
        </div>

        <button className={styles.clearDonedBtn} onClick={this.removeAllDone}>清除所有已完成的事项</button>
      </div>
    )
  }
}
