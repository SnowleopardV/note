import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.module.css'

export default class MyNavLink extends Component {
  render () {
    console.log(7, this.props, this.props.children)
    // return <NavLink {...this.props} activeClassName={styles.activeLink} className={styles.link} />
    // 等价于
    // return <NavLink to={this.props.to} activeClassName={styles.activeLink} className={styles.link} children={this.props.children} />
    // 等价于
    return <NavLink to={this.props.to} activeClassName={styles.activeLink} className={styles.link}>{this.props.children}</NavLink>
  }
}
