// import "@babel/polyfill"
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'

import App from './router'

import './pages/home/style.scss'

Loadable.preloadAll().then(() => {
  ReactDOM.hydrate(
    <App/>,
    document.querySelector('#root')
  )  
})

