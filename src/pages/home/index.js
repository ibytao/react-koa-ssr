import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { withRouter } from "react-router"
import classnames from 'classnames'
import styles from './style.scss'
// import CSSModules from 'react-css-modules'

@withRouter
// @CSSModules(styles, { allowMultiple: true })
export default class Home extends React.Component {

  constructor(props) {
    super(props)
    // this.fetchData()
    // this.state = {
    //   data: ''
    // }
    // console.log(this.props)
  }

  static fetching (ctx) {
    console.log('home--loaddata---')
    return axios.get('https://facebook.github.io/react-native/movies.json')
      .then(res => {
        return res.data
      })
  }

  Head () {
    return (
      <Helmet>
        <title>My Page title</title>
      </Helmet>
    )
  }

  exampleMethod () {
    console.log('Js is running')
    // location.href = '/about'
    this.props.history.push('/about')
    // console.log(this.props.history)
  }
  render () {
    console.log(styles.title, '-0-0-0-0-0-0')

    const classes = classnames({
      title: true
    })

    return (
      <div className={styles.title}>
        {this.Head()}
        <h1>My home page</h1>
        <p>Some content</p>
        <img src='/images/login.png'/>
        <button onClick={this.exampleMethod.bind(this)}>Console log some text</button>
      </div>
    )
  }
}
