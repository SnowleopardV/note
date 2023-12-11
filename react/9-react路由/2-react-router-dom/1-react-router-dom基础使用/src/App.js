import { Route } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import NavBar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <NavBar />
      {/* 注册路由 */}
      <Route path='/home' component={Home}></Route>
      <Route path='/list' component={List}></Route>
      <Route path='/detail' component={Detail}></Route>
    </div>
  )
}

export default App
