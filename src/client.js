// import "@babel/polyfill"
import 'babel-polyfill'
import React from 'react'
import {hydrate} from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import store from './redux/store'

import Router from './router'

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <Router/>
    </Provider>,
    document.querySelector('#root')
  )
})

