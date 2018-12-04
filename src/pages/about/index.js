import React from 'react'
import {Helmet} from 'react-helmet'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'


export default class About extends React.Component {

  constructor(props) {
    super(props)
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
      <div>
        <Button>default</Button>
        <h1>My about page</h1>
        <p>Some content</p>
      </div>
    )
  }
}
