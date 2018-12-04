// import "@babel/polyfill"
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './router'

ReactDOM.hydrate(
  <App/>,
  document.querySelector('#root')
)
