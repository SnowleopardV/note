import React, { Component } from 'react'
import styles from './index.module.css'

export default class Home extends Component {
  render () {
    console.log(6, this.props)
    return (
      <div className={styles.home}>
        Home....
      </div>
    )
  }
}
