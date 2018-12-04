import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { matchRoutes, renderRoutes } from 'react-router-config';
import {Provider} from 'react-redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../../../react-loadable.json'

import Routes from '../../client/routes'

const renderer = function (ctx, context) {
  let modules = []
  
  const content = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter location={ctx.path} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Loadable.Capture>
  )

  console.log(modules, '=====')

  let bundles = getBundles(stats, modules)
  
  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
        <link rel='stylesheet' type='text/css' href='//unpkg.com/antd-mobile/dist/antd-mobile.min.css' />
        <link rel='stylesheet' type='text/css' href='//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' />
       ${bundles.map(bundle => {return `<script src="/${bundle.file}"></script>`}).join('\\n')}
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

  const actionsTemp = matchRoutes(Routes, ctx.path)
        .map(({route}) => !route.component.preload ? route.component : route.component.preload().then(res => res.default))

  const loadedActions = await Promise.all(actionsTemp)

  const actions = loadedActions
        .map(component => component.fetching ? component.fetching(ctx) : null)
        .map(async actions => {
          if (actions) {
            return await new Promise(resolve => actions.then((res) => {
              console.log(res, '||||||')
              resolve(res)
            }).catch(resolve))
          }
        })


  await Promise.all(actions)
  var context = {}
  const content = renderer(ctx, context)

  ctx.body = content
}
