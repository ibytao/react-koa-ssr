import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Routes from 'routes/index'

// const renderRoutes = (routes, authed, authPath, extraProps = {}, switchProps = {}) => routes ? (
//   <Switch {...switchProps}>
//     {routes.map((route, i) => (
//       <Route
//         key={route.key || i}
//         path={route.path}
//         exact={route.exact}
//         strict={route.strict}
//         render={(props) => {
          
//           if( !route.restricted || authed || route.path == authPath) {
//             return <route.component {...props} {...extraProps} route={route}/>
//           }
//           const redirPath = authPath ? authPath : '/login'
//           return <Redirect to={{pathname: redirPath, state: {from: props.location}}}/>
//         }}
//       />
//     ))}
//   </Switch>
// ) : null

export default class App extends React.Component {
  render () {
    return renderRoutes(Routes)
  }
}
