import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import List from '../pages/List'
import Message from '../components/Message'
import News from '../components/News'

// 路由表
const routes = [
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'message',
        element: <Message />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: '',
        element: <Navigate to='message' />,
      },
    ],
  },
  {
    path: '/list',
    element: <List />,
  },
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
]

export default routes
