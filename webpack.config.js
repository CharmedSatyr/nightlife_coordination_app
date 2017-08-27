/*** PACKAGES ***/
const CompressionPlugin = require('compression-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

require('dotenv').load()
const PROD = process.env.NODE_ENV === 'production'

/*** COMMON PLUGINS ***/
const compConfig = new CompressionPlugin({
  asset: '[path].gz[query]',
  test: /\.(js|html|css|json|ico|eot|otf|ttf)$/, //Defaults to all plugins, but using this: https://www.fastly.com/blog/new-gzip-settings-and-deciding-what-compress/
  algorithm: 'gzip',
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false
})

const defineConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
})

const uglyConfig = new webpack.optimize.UglifyJsPlugin()

/*** CLIENT CONFIG ***/
const client = {
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
        test: /\.(css|sass|scss)$/i,
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
        test: /\.(eot|ttf|svg|woff|woff2)$/i,
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
        defineConfig,
        uglyConfig,
        compConfig,
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
        defineConfig,
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

/*** SERVER CONFIG ***/
const server = {
  entry: ['babel-polyfill', __dirname + '/server/server.js'],
  devtool: PROD ? false : 'source-map',
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
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  output: {
    path: __dirname + '/server',
    filename: PROD ? 'server.bundle.min.js' : 'server.bundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  plugins: PROD ? [defineConfig, compConfig, uglyConfig] : [defineConfig]
}
module.exports = [client /*, server*/]
