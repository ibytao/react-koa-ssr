import '@babel/polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
// import route from './routes'
import Loadable from 'react-loadable'
import store from '../src/redux/store'
import { matchRoutes } from 'react-router-config'
import Render from './render'
import Routes from '../src/router/Routes'
// import koaWebpack from 'koa-webpack'
// import webpack from 'webpack'
// const config = require ('../webpack.client.js')
// const compiler = webpack(config)

const port = process.env.PORT || 3001;
const app = new Koa()

app.use(bodyParser())
app.use(serve('assets'))
app.use(serve('build/public'))

// koaWebpack({ compiler })
//   .then((middleware) => {
//     app.use(middleware);
//   })

// api
// app.use(route.routes())
// render react tempalet
app.use(async (ctx, next) => {
  await next()
  const actionsTemp = matchRoutes(Routes, ctx.path)
        .map(({route}) => !route.component.preload ? route.component : route.component.preload().then(res => res.default))

  const loadedActions = await Promise.all(actionsTemp)

  const actions = loadedActions
        .map(component => component.fetching ? component.fetching({...store, ctx}) : null)
        .map(async actions => {
          actions = actions || []
          if (!Array.isArray(actions)) {
            actions = [actions]
          }
          return await Promise.all(
            actions.map(p => p && new Promise(resolve => {
              p.then !== undefined ? p.then(resolve).catch(resolve) : resolve(p)
            }))
           )
        })

  await Promise.all(actions)
  const content = Render(ctx, store, {})
  ctx.body = content
})

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.log(`Frontend service listening on port: ${port}`)
  })
})


