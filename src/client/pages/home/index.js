import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { renderRoutes } from 'react-router-config';
import { withRouter } from "react-router"

const MyComponent = (WrappedComponent) =>
      class extends React.Component {
        Head () {
          return (
            <Helmet>
              <title>My Wrapped Component Page title</title>
            </Helmet>
          )
        }
        
        render () {
          const {route} = this.props
          return (
            <div>
              <h1>hello world wrapped component</h1>
              {renderRoutes(route.routes)}
              <WrappedComponent/>
            </div>
          )
        }
      }

async function fetchData () {
  const data = await axios.get('https://facebook.github.io/react-native/movies.json')
  // console.log(data.data)
}

@MyComponent
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

  async fetchData () {
    const data = await axios.get('https://facebook.github.io/react-native/movies.json')
          .then(res => res.data)
    // this.setState({data})
  }

  static loadData (ctx) {
    console.log('--loaddata---', this)
    return fetchData()
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
    this.props.history.push('/about')
    // console.log(this.props.history)
  }
  render () {
    return (
      <div>
        <div></div>
        {this.Head()}
        <h1>My home page</h1>
        <p>Some content</p>
        <button onClick={this.exampleMethod.bind(this)}>Console log some text</button>
      </div>
    )
  }
}
