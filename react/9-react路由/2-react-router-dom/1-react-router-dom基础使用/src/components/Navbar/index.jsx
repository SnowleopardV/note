import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

export default class NavBar extends Component {
  render () {
    return (
      <div>
        <h1>点击切换路由</h1>
        {/* 编写路由链接 */}
        <Link to='/home' className={styles.link}>
          首页
        </Link>
        <Link to='/list' className={styles.link}>
          列表
        </Link>
        <Link to='/detail' className={styles.link}>
          详情
        </Link>
      </div>
    )
  }
}
