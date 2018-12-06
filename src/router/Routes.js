import React, {Component} from 'react'
import Import from 'components/DynamicImport'

export default [
  {
    path: '/',
    exact: true,
    component: Import(import('../pages/home'))
  },
  {
    path: '/about',
    component: Import(import('../layouts')),
    routes: [
      {
        path: "/:id",
        component: Import(import('../pages/about'))
      }
    ]
  },
  {
    path: '*',
    component: Import(import('../pages/not-found'))
  }
]
