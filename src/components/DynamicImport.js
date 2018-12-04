import React, {Component} from 'react'
import Loadable from 'react-loadable'

const loading = () => <div>Loading...</div>

export default (component) => Loadable({
  loader: () => component,
  loading
})
