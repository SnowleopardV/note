import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MyNavLink from '../../components/MyNavLink'
import styles from './index.module.css'
import News from './News'
import Message from './Message'

export default class Home extends Component {
  render () {
    console.log('route-component', this.props)
    return (
      <div className={styles.home}>
        <MyNavLink to="/home/news">新闻</MyNavLink>
        <MyNavLink to="/home/message">消息</MyNavLink>

        <Switch>
          <Route path="/home/news" component={News} />
          <Route path="/home/message" component={Message} />
          <Redirect to="/home/news" />
        </Switch>

      </div>
    )
  }
}
