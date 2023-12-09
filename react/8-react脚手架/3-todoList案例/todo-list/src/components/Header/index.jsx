import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { nanoid as nanoId } from 'nanoid'

export default class Header extends Component {

  static propTypes = {
    daddTodo: PropTypes.func.isRequired
  }

  addMatter = (e) => {
    if (e.keyCode !== 13) return

    const { addTodo } = this.props
    const todo = {
      id: nanoId(),
      matter: e.target.value,
      done: false
    }
    addTodo(todo)

    e.target.value = ''
  }

  render () {
    return (
      <input type="text" onKeyUp={this.addMatter} className={styles.input} placeholder='请输入你的任务名称, 按回车键确认' />
    )
  }
}
