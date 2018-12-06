import React from 'react'
import {renderToString} from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config';
import {Provider} from 'react-redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json'
import Routes from '../src/router/Routes'

export default (ctx, store, context) => {
  let modules = []
  const content = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={ctx.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  )

  console.log(modules, '=====================')

  let bundles = getBundles(stats, modules)

  const helmet = Helmet.renderStatic()

  const html = `
    <html>
      <head>
        ${helmet.meta.toString()}
        ${helmet.title.toString()}
        <link rel='stylesheet' type='text/css' href='//unpkg.com/antd-mobile/dist/antd-mobile.min.css' />
        <link rel='stylesheet' type='text/css' href='//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css' />
        <link rel='stylesheet' type='text/css' href='/css/main.css' />
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="/vendor.js"></script>
        ${bundles.map(bundle => {return `<script src="/${bundle.file}"></script>`}).join('\\n')}
        <script src="main.js"></script>
      </body>
    </html>
  `
  return html
}