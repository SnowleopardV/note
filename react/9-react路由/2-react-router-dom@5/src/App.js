import { Route, Switch, Redirect } from 'react-router-dom'
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
        {/* 路由的模糊匹配  /detail/a/b/c 能匹配上 */}
        <Route path='/detail' component={Test}></Route>
        {/* 精准匹配  exact={true} /detail/a/b/c 不能匹配上  */}
        <Route path='/detail' exact component={Test}></Route>
        {/* 兜底规则 上面的路由都没有匹配上的时候, 走Redirect的to */}
        <Redirect to='/home' />
      </Switch>
    </div>
  )
}

export default App
