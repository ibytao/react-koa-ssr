import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from "react-router"
import styles from './style.scss'

@withRouter
export default class About extends React.Component {
  constructor(props) {
    super(props)
  }

  static fetching (ctx) {
    console.log('about--loaddata---')
    return axios.get('https://facebook.github.io/react-native/movies.json').then(res => res.data)
  }

  Head () {
    return (
      <Helmet>
        <title>about Page title</title>
      </Helmet>
    )
  }

  render () {
    return (
      <div className={styles.title}>
         {this.Head()}
        <Button>default</Button>
        <h1>My about page</h1>
        <p>Some content</p>
      </div>
    )
  }
}
