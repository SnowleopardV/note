import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import styles from './index.module.css'

export default function Home () {

  const getClassName = active => active.isActive ? `${styles.link} ${styles.active}` : styles.link

  return (
    <div>
      <h3>Home组件</h3>
      <div className={styles.card}>
        {/* <NavLink to='/home/message' className={getClassName}>Message</NavLink>
        <NavLink to='/home/news' className={getClassName}>News</NavLink> */}
        {/* 也可以写成 */}
        <NavLink to='message' className={getClassName}>Message</NavLink>
        <NavLink to='news' className={getClassName}>News</NavLink>
      </div>
      <Outlet />
    </div>

  )
}
