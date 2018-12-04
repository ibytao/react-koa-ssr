import React from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios'
import { renderRoutes } from 'react-router-config';
import { withRouter } from "react-router"

// const MyComponent = (WrappedComponent) =>
//       class extends WrappedComponent {
//         Head () {
//           return (
//             <Helmet>
//               <title>My Wrapped Component Page title</title>
//             </Helmet>
//           )
//         }

//         render () {
//           const {route} = this.props
//           return (
//             <div>
//               <h1>hello world wrapped component</h1>
//               <div>{renderRoutes(route.routes)}</div>
//               {super.render()}
//             </div>
//           )
//         }
//       }

async function fetchData () {
  const data =  await axios.get('https://facebook.github.io/react-native/movies.json')
  return data.data
  // console.log(data.data)
}

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
    console.log('--loaddata---')
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
