// import React from 'react'
import React from './react'
import ReactDOM from 'react-dom/client'
import './index.css'

const style = { border: '3px solid red', margin: '10px' }

const element = (
  <div id='A' style={style}>
    A
    <div id='B1' style={style}>
      B1
      <div id='C1' style={style}>
        C1
      </div>
      <div id='C2' style={style}>
        C2
      </div>
    </div>
    <div id='B2' style={style}>
      B2
    </div>
  </div>
)

const element2 = React.createElement(
  'div',
  {
    id: 'A',
    style,
  },
  React.createElement(
    'div',
    {
      id: 'B1',
      style,
    },
    React.createElement(
      'div',
      {
        id: 'C1',
        style,
      },
      'C1'
    ),
    React.createElement(
      'div',
      {
        id: 'C2',
        style,
      },
      'C2'
    )
  ),
  React.createElement(
    'div',
    {
      id: 'B2',
      style,
    },
    'B2'
  )
)

console.log(18, element, element2)

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(<React.StrictMode>{element}</React.StrictMode>)
