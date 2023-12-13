import { Route, Switch, Redirect } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import NavBar from './components/Navbar'
import Test from './pages/Test'

const Home = lazy(() => import('./pages/Home'))
const List = lazy(() => import('./pages/List'))
const Detail = lazy(() => import('./pages/Detail'))

function App() {
  return (
    <div className='App'>
      <NavBar />
      {/* 注册路由 */}

      <Suspense fallback={<h1>Loading....</h1>}>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/list' component={List}></Route>
          <Route path='/detail' component={Detail}></Route>
          {/* 路由的模糊匹配  /detail/a/b/c 能匹配上 */}
          <Route path='/detail' component={Test}></Route>
          {/* 精准匹配  exact={true} /detail/a/b/c 不能匹配上  */}
          {/* <Route path='/detail' exact component={Test}></Route> */}
          {/* 兜底规则 上面的路由都没有匹配上的时候, 走Redirect的to */}
          <Redirect to='/home' />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
