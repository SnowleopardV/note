import { NavLink, useRoutes } from 'react-router-dom'
// import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import routes from './routes'
import styles from './App.module.css'

export default function App () {

  const element = useRoutes(routes)

  const getClassName = active => {
    return active.isActive ? `${styles.link} ${styles.active}` : styles.link
  }

  return (
    <div className={styles.app}>
      <h1>App</h1>
      <div className={styles.card}>
        <h3>导航区</h3>
        {/* NavLink移除了activeClassName属性, 改为className接收一个函数, 这个函数有一个入参, 当前是否命中路由规则 */}
        <NavLink className={getClassName} to="/home">Home</NavLink>
        <NavLink className={getClassName} to="/list">List</NavLink>
      </div>
      <div>
        <h3>内容展示区</h3>
        {/* 注册路由, 需要用Routes包裹, 效果和之前的Switch效果一致*/}
        {/* <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/list' element={<List />} />
          <Route path='/' element={<Navigate to='/home' />} />
        </Routes> */}

        {element}

      </div>
      {/* <Home />
      <List /> */}
    </div>
  )
}
