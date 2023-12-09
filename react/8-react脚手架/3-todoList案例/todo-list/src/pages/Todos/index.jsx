import React, { Component } from 'react'
import styles from './index.module.css'
import Header from "../../components/Header";
import List from '../../components/List'
import Footer from '../../components/Footer';

export default class Todos extends Component {

  state = {
    todos: [
      { id: 1, matter: '学习', done: false },
      { id: 2, matter: '挣钱', done: true },
      { id: 3, matter: '旅游', done: true },
    ]
  }

  addTodo = todo => this.setState({ todos: [todo, ...this.state.todos] })

  updateTodo = (id, done) => {
    const newTodos = this.state.todos.map(todo => todo.id === id ? { ...todo, done } : todo)
    this.setState({ todos: newTodos })
  }
  updateAllDoneStatus = (done) => {
    const newTodos = this.state.todos.map(item => {
      item.done = done
      return item
    })

    this.setState({ todos: newTodos })
  }

  deleteTodo = (id) => this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) })

  clearAllDone = () => this.setState({ todos: this.state.todos.filter(todo => !todo.done) })

  render () {
    const { todos } = this.state
    return (
      <div className={styles.todosWrap}>
        <Header addTodo={this.addTodo} />
        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <Footer todos={todos} clearAllDone={this.clearAllDone} updateAllDoneStatus={this.updateAllDoneStatus} />
      </div>
    )
  }
}
