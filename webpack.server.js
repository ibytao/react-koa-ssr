const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const config = require('./config')

module.exports = {
  mode: config.env,
  target: 'node',
  entry: './server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  resolve: {
    modules: [path.resolve('./src'), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {browsers: ['last 2 versions']}
              }]
            ]
          }
        }
      }
    ]
  },
  externals: [webpackNodeExternals()]
}
