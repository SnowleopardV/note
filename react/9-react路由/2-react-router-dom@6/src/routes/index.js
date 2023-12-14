import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import List from '../pages/List'
import Message from '../components/Message'
import News from '../components/News'
import MessageDetail from '../components/MessageDetail'

// 路由表
const routes = [
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'message',
        element: <Message />,
        children: [
          {
            // 1. params形式传参
            // path: 'detail/:id/:title/:content',
            // 2. 3. search和state形式传参
            path: 'detail',
            element: <MessageDetail />,
          },
        ],
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
