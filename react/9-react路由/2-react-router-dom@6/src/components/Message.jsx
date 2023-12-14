import React, { useState } from 'react'
// import { Link, Outlet  } from 'react-router-dom'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Message () {

  const [messages, setMessage] = useState([{
    id: 0,
    title: '悯农',
    content: `锄禾日当午`
  }, {
    id: 1,
    title: '静夜思',
    content: `窗前明月光`
  }, {
    id: 2,
    title: '小儿垂钓',
    content: `小荷才露尖尖儿`
  }, {
    id: 3,
    title: '咏鹅',
    content: `鹅鹅鹅曲项向天歌`
  }])

  const navigate = useNavigate()

  const gotoDetail = (message) => {
    console.log(28, message)
    // 1. params形式传参
    // navigate(`detail/${message.id}/${message.title}/${message.content}`)
    // 2. search形式传参
    navigate(`detail?id=${message.id}&title=${message.title}&content=${message.content}`)
    // 3. state形式传参
    // navigate('detail', {
    //   replace: false,
    //   state: { id: message.id, title: message.title, content: message.content }
    // })
  }

  return (
    <div>
      <h1>Message组件</h1>
      <div>
        {
          messages.map(message => (
            <button key={message.id} onClick={() => gotoDetail(message)}>
              {/* 一、声明式路由 */}
              {/* 1. params形式传参 */}
              {/* <Link to={`detail/${message.id}/${message.title}/${message.content}`}>{message.title}</Link> */}

              {/* 2. search形式传参 */}
              {/* <Link to={`detail?id=${message.id}&title=${message.title}&content=${message.content}`}>{message.title}</Link> */}

              {/* 3. state形式传参 */}
              {/* <Link to="detail" state={{ id: message.id, title: message.title, content: message.content }}>{message.title}</Link> */}
              {/* 编程式导航 */}

              {message.title}
            </button>
          ))
        }
      </div>
      <Outlet />
    </div>
  )
}
