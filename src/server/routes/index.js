import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { matchRoutes, renderRoutes } from 'react-router-config';
import {Provider} from 'react-redux'

import Routes from '../../client/routes'

const renderer = function (ctx, context) {
  const content = renderToString(
    <StaticRouter location={ctx.path} context={context}>
      {renderRoutes(Routes)}
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
        <link rel='stylesheet' type='text/css' href='//unpkg.com/antd-mobile/dist/antd-mobile.min.css' />
        <link rel='stylesheet' type='text/css' href='//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' />
      </head>
      <body>
        <div id="root">
        ${content}
        </div>
        <script src="client_build.js"></script>
      </body>
    </html>
  `  
  return html
}

export default async (ctx, next) => {
  await next()
  
  const promises = matchRoutes(Routes, ctx.path)
        .map(({route}) => {
          return route.loadData ? route.loadData(ctx) : null
        })
        .map(promise => {
          if (promise) {
            return new Promise((resolve, reject) => {
              promise.then(resolve).catch(resolve)
            })
          }
        })

  await Promise.all(promises)
  
  var context = {}
  const content = renderer(ctx, context)

  ctx.body = content
}
