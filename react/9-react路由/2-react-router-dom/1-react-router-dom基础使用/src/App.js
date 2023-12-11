import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import styles from './App.module.css'
function App() {
  return (
    <div className='App'>
      <div>
        <h1>点击切换路由</h1>
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

      <Route path='/home' component={Home}></Route>
      <Route path='/list' component={List}></Route>
      <Route path='/detail' component={Detail}></Route>
    </div>
  )
}

export default App
