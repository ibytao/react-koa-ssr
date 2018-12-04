const path = require('path')
const webpack = require('webpack')
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin

module.exports = {
  entry: 'client.js',
  output: {
    filename: 'client_build.js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve('./src/client'), "node_modules"]
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/webpack-images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].min.css',
              outputPath: 'assets/css/'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new reactLoadablePlugin({
      filename: './react-loadable.json',
    })
  ]
}
