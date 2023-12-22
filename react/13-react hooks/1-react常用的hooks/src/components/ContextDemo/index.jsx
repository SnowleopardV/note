import React, { useState, useContext, createContext } from 'react'

const myContext = createContext()
console.log(4, myContext)
const { Provider } = myContext

export default function Parent () {
  const [list, setList] = useState([
    { name: 'lilei', age: 20, id: 1 }
  ])

  const addTom = () => setList([...list, { name: 'tom', age: 21, id: list.length + 1 }])
  return (
    <Provider value={{ count: 1000 }}>
      <div style={{ border: '1px solid black' }}>
        <h1>Parent组件</h1>
        <button onClick={addTom}>添加Tom</button>
        <Son />
      </div>
    </Provider>
  )
}


const Son = () => (
  <div>
    <h2>Son组件</h2>
    <GrandSon />
  </div>
)

const GrandSon = () => {
  const value = useContext(myContext)
  console.log(33, value)

  return (<div>
    <h3>Grand Son组件</h3>
    <div>78777</div>
  </div>)
}