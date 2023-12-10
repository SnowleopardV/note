import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import styles from './index.module.css'

export default class List extends Component {

  state = {
    users: [],
    isFirst: true,
    isLoading: false,
    error: ''
  }

  componentDidMount () {
    this.token = PubSub.subscribe('listStateChange', (_, data) => {
      this.setState(data)
      console.log(16, data)
    })
  }

  componentWillUnmount () {
    PubSub.unsubscribe(this.token)
  }

  render () {
    const { users, isFirst, isLoading, error } = this.state
    return isFirst ? (<h1>输入用户名, 查询github用户</h1 >) :
      isLoading ? (<h1>Loading...</h1 >) :
        error ? (<h1 style={{ color: 'red' }}>{error}</h1 >) :
          (<div className={styles.listWrap}>
            {
              users.map(user => (<div className={styles.listItem} key={user.id}>
                <a href={user.html_url} target='_blank'>
                  <img className={styles.img} src={user.avatar_url
                  } alt="" />
                  <p>{user.login}</p>
                </a>
              </div>))
            }
          </div>
          )
  }
}
