import React, { useState } from 'react'

export default function Parent () {
  const [list, setList] = useState([
    { name: 'lilei', age: 20, id: 1 }
  ])

  const addTom = () => setList([...list, { name: 'tom', age: 21, id: list.length + 1 }])
  return (
    <div>
      <h1>Parent组件</h1>
      <button onClick={addTom}></button>
      <Son />
    </div>
  )
}


const Son = () => (
  <div>
    <h2>Son组件</h2>
  </div>
)