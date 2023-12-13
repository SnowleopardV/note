import React, { Component } from 'react'
import styles from './index.module.css'
export default class Welcome extends Component {
  render () {
    return (
      <div className={styles.welcomeTitle}>欢迎来到React的世界!</div>
    )
  }
}
