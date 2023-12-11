import React, { Component } from 'react'
import styles from './index.module.css'

export default class Home extends Component {
  render () {
    console.log('route-component', this.props)
    return (
      <div className={styles.home}>
        Home....
      </div>
    )
  }
}
