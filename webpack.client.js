const path = require('path')
const webpack = require('webpack')
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin
const config = require('./config')

module.exports = {
  devtool: 'eval-source-map',
  mode: config.env,
  entry: 'client.js',
  output: {
    path: path.resolve(__dirname, 'build/public'),
    chunkFilename: '[name].js',
    filename: '[name].js',
    publicPath: '/'
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
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
}
