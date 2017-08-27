const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

require('dotenv').load()
const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  } /*
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },*/,
  entry: ['babel-polyfill', __dirname + '/server/server.js'],
  devtool: PROD ? false : 'source-map',
  output: {
    path: __dirname + '/server',
    filename: PROD ? 'server.bundle.min.js' : 'server.bundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: PROD
    ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }),
        //        new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          test: /\.(js|html|css|json|ico|eot|otf|ttf)$/, //Defaults to all plugins, but using this: https://www.fastly.com/blog/new-gzip-settings-and-deciding-what-compress/
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    : [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        })
      ]
}
