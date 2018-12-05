const path = require('path')
const webpack = require('webpack')
const reactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('./config')

module.exports = {
  devtool: config.debug ? 'inline-sourcemap' : false,
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
        test: /\.jsx?$/,
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
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new reactLoadablePlugin({
      filename: './react-loadable.json',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    })
  ],
  optimization: {
    nodeEnv: config.env,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        }
      })
    ]
  }
}
