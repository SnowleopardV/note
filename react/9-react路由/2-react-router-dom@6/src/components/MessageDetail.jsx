import React from 'react'
import { useParams, useMatch } from 'react-router-dom'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

export default function MessageDetail () {
  // 1. params形式传参
  // const params = useParams()
  // const match = useMatch('/home/message/detail/:id/:title/:content')
  // console.log(6, params, match)
  // const { title, content } = params

  // 2. search形式传参
  const [search, setSearch] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')

  // 3. state形式传参
  // const location = useLocation()

  // console.log(location)

  // const { title, content } = location.state

  const navigate = useNavigate()
  const forward = () => navigate(1)
  const back = () => navigate(-1)

  return (
    <div>
      <h1>{title}</h1>
      <h3>{content}</h3>
      <button onClick={forward}>前进</button>
      <button onClick={back}>后退</button>
    </div>
  )
}