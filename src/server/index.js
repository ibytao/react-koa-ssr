import '@babel/polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import route from './routes'

import express from 'express';

const port = process.env.PORT || 8888;
const app = new Koa()

app.use(bodyParser())
app.use(serve('build/public'))

app.use(route)

app.listen(port, () => {
  console.log(`App running ${port}`)
})

