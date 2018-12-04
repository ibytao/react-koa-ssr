import React from 'react'
import { renderRoutes } from 'react-router-config';
import {Helmet} from 'react-helmet'
import axios from 'axios'

export default class Layout extends React.Component {
  static fetching (ctx) {
    console.log('layout--loaddata---')
    return axios.get('https://facebook.github.io/react-native/movies.json').then(res => res.data)
  }
  
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
        {this.Head()}
        <h1>Layout</h1>
        <div>{renderRoutes(route.routes)}</div>
      </div>
    )
  }
}
