import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// import styles from './index.module.css'
import MyNavLink from '../MyNavLink'
import LinkContent from '../LinkContent'


class NavBar extends Component {
  // 一般组件上的this.props上是没有 history、location、match等这些字段
  // 一般组件需要用withRouter包裹一下, 生成一个新的组件, this.props上携带 history、location、match等这些属性
  goForward = () => {
    this.props.history.goForward()
  }

  goBack = () => {
    this.props.history.goBack()
  }

  go = () => {
    this.props.history.go(-1)
  }

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

        <button onClick={this.goForward}>前进</button>
        <button onClick={this.goBack}>后退</button>
        <button onClick={this.go}>go</button>
      </div>
    )
  }
}

export default withRouter(NavBar)