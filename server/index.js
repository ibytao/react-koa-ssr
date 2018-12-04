import '@babel/polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import route from './routes'
import Loadable from 'react-loadable'
import Render from './render'



const port = process.env.PORT || 7777;
const app = new Koa()

app.use(bodyParser())
app.use(serve('build/public'))

// api
app.use(route.routes())
// render react tempalet
app.use(Render)


Loadable.preloadReady().then(() => {
  app.listen(port, () => {
    console.log(`App running ${port}`)
  })
})

