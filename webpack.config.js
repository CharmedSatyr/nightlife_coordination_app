const CompressionPlugin = require('compression-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

require('dotenv').load()
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: ['babel-polyfill', __dirname + '/client/src/index.jsx'],
  devtool: PROD ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000, //limit =< 10000 ? Data URL : fallback to file-loader
          name: 'img/[sha256:hash:5].[ext]' //If using file-loader, emit to img/ as a 10 digit sha256 has with the proper extension.
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[sha256:hash:5].[ext]' //must use full output path
        }
      }
    ]
  },
  output: {
    path: __dirname + '/client/views',
    filename: PROD ? 'js/client.bundle.min.js' : 'js/client.bundle.js'
  },
  plugins: PROD
    ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }),
        new HTMLWebpackPlugin({
          title: 'Charmed Nightlife',
          template: __dirname + '/client/src/' + 'index.html',
          filename: __dirname + '/client/views/' + 'index.html',
          inject: 'body'
        }),
        new HTMLWebpackPlugin({
          title: 'Login',
          template: __dirname + '/client/src/' + 'login.html',
          filename: __dirname + '/client/views/' + 'login.html',
          inject: 'body'
        })
      ]
    : [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }),
        new HTMLWebpackPlugin({
          title: 'Charmed Nightlife',
          template: __dirname + '/client/src/' + 'index.html',
          filename: __dirname + '/client/views/' + 'index.html',
          inject: 'body'
        }),
        new HTMLWebpackPlugin({
          title: 'Login',
          template: __dirname + '/client/src/' + 'login.html',
          filename: __dirname + '/client/views/' + 'login.html',
          inject: 'body'
        })
      ]
}
