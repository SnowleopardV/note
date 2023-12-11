import React, { Component } from 'react'

export default class News extends Component {
  render () {
    return (
      <div style={{ backgroundColor: 'yellowgreen', padding: '20px' }}>
        <h1>新闻</h1>
        <ul>
          <li>吴彦祖</li>
          <li>范冰冰</li>
          <li>徐峥</li>
        </ul>
      </div>
    )
  }
}
