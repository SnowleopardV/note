import React, { Component } from 'react'
import Search from '../../components/Search'
import List from '../../components/List'
import styles from './index.module.css'


export default class index extends Component {
  render () {
    return (
      <div className={styles.githubUserWrpa}>
        <h1>消息订阅-发布机制</h1>
        <Search />
        <List />
      </div>
    )
  }
}
