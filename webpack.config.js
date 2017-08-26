const CompressionPlugin = require('compression-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', __dirname + '/client/src/index.jsx'],
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
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
          name: 'img/[sha256:hash:10].[ext]' //If using file-loader, emit to img/ as a 10 digit sha256 has with the proper extension.
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'fonts/[sha256:hash:7].[ext]'
        }
      }
    ]
  },
  output: {
    path: __dirname + '/client/views',
    //    filename: 'js/client.bundle.min.js' //Dev. This puts the client bundle into js but allows other resources to go into the folders specified in their paths
    filename: 'js/client.bundle.min.js' //production
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        //NODE_ENV: JSON.stringify('development')
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      test: /\.(js|html)$/, //Defaults to all plugins
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
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
