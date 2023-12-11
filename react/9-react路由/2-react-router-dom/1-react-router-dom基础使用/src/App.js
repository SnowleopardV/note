import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import NavBar from './components/Navbar'
import Test from './pages/Test'

function App() {
  return (
    <div className='App'>
      <NavBar />
      {/* 注册路由 */}
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/list' component={List}></Route>
        <Route path='/detail' component={Detail}></Route>
        <Route path='/detail' component={Test}></Route>
      </Switch>
    </div>
  )
}

export default App
