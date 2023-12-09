import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../../components/Item'
import styles from './index.module.css'

export default class List extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }

  render () {
    const { todos, updateTodo, deleteTodo } = this.props
    return (
      <div className={styles.todosWrap}>
        {
          todos.map(todo => <Item key={todo.id} {...todo} {...this.props} />)
        }
      </div>
    )
  }
}
