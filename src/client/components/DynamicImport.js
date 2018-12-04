import React from 'react'
import axios from 'axios'

async function fetchData () {
  const data = await axios.get('https://facebook.github.io/react-native/movies.json')
  console.log(data.data)
}

export default class DynamicImport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: null
    }
  }
  
  static loadData (ctx) {
    console.log('--loaddata---', this)
    return fetchData()
  }

  componentDidMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component
        }))
      })
  }
  render() {
    return this.props.children(this.state.component)
  }
}
