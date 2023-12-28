import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const element = (
  <div id='A'>
    <div id='B1'>
      <div id='C1'>C1</div>
      <div id='C2'>C2</div>
    </div>
    <div id='B2'>B2</div>
  </div>
)

const element2 = React.createElement(
  'div',
  {
    id: 'A',
  },
  React.createElement(
    'div',
    {
      id: 'B1',
    },
    React.createElement(
      'div',
      {
        id: 'C1',
      },
      'C1'
    ),
    React.createElement(
      'div',
      {
        id: 'C2',
      },
      'C2'
    )
  ),
  React.createElement(
    'div',
    {
      id: 'B2',
    },
    'B2'
  )
)

console.log(18, element, element2)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<React.StrictMode>{element}</React.StrictMode>)
