import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { withRouter } from "react-router"

@withRouter
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
    return (
      <div>
        {this.Head()}
        <h1>My home page</h1>
        <p>Some content</p>
        <button onClick={this.exampleMethod.bind(this)}>Console log some text</button>
      </div>
    )
  }
}
