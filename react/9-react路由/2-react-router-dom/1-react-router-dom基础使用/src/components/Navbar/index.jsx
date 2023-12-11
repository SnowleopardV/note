import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// import styles from './index.module.css'
import MyNavLink from '../MyNavLink'
import LinkContent from '../LinkContent'


export default class NavBar extends Component {
  render () {
    console.log('normal-component', this.props)
    return (
      <div>
        <h1>点击切换路由</h1>
        {/* 编写路由链接 Link*/}
        {/* <Link to='/home' className={styles.link}>
          首页
        </Link>
        <Link to='/list' className={styles.link}>
          列表
        </Link>
        <Link to='/detail' className={styles.link}>
          详情
        </Link> */}

        {/* 编写路由链接 NavLink*/}
        {/* <NavLink to='/home' activeClassName={styles.activeLink} className={styles.link}>
          首页
        </NavLink>
        <NavLink to='/list' activeClassName={styles.activeLink} className={styles.link}>
          列表
        </NavLink>
        <NavLink to='/detail' activeClassName={styles.activeLink} className={styles.link}>
          详情
        </NavLink> */}

        {/* 封装的路由链接 MyNavLink */}
        {/* 标签体的内容由props.children进行传递 */}
        <MyNavLink to='/home'><p>首页</p></MyNavLink>
        <MyNavLink to='/list'><p>列表</p></MyNavLink>
        <MyNavLink to='/detail'><p>详情</p></MyNavLink>
        <MyNavLink to='/detail'><LinkContent name='jack' age="100" /></MyNavLink>
      </div>
    )
  }
}
