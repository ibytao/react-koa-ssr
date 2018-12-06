import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { withRouter } from "react-router"
import classnames from 'classnames'
import { connect } from 'react-redux'
import { fetchHome } from './redux'
import styles from './style.scss'

@withRouter
@connect(({ home }) => ({ home }), { fetchHome })
export default class Home extends React.Component {

  constructor(props) {
    super(props)
    // this.fetchData()
    // this.state = {
    //   data: ''
    // }
    // console.log(this.props)
  }

  static fetching ({dispatch, ctx}) {
    console.log('home--loaddata---')
    // return [dispatch(fetchHome())]
  }

  componentDidMount() {
    const { home: { data } } = this.props;

    if (!data || data.length === 0) {
      this.props.fetchHome()
    }
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
    // console.log(styles.title, '-0-0-0-0-0-0')

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
