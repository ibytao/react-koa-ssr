import React, {Component} from 'react'
import Loadable from 'react-loadable'
import DynamicImport from 'components/DynamicImport'

const loading = () => <div>Loading...</div>

const Import = (path) => {
  return props => (
    <DynamicImport load={() => import('../pages/home')}>
      {(Component) => {
        // Import.loadData = Component.loadData
        if (Component === null) {
          return <p>Loading</p>
        } else {
          Import.loadData = Component.loadData
          return <Component {...props} />
        }
      }}
    </DynamicImport>
  )
}

const Home = Loadable({
  loader: () => import('../pages/home'),
  loading
})

const About = Loadable({
  loader: () => import('../pages/about'),
  loading
})

const NotFound = Loadable({
  loader: () => import('../pages/not-found'),
  loading
})


export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: "/about",
        component: About
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]
