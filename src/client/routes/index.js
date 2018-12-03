import Loadable from "react-loadable"
import Home from  'pages/home'
import About from 'pages/about'
import NotFound from 'pages/not-found'

function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

const LoadableComponent = Loadable({
  loader: () => import("../pages/about"),
  loading: Loading
})

export default [
  {
    path: '/',
    component: Home,
    loadData: Home.loadData,
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
