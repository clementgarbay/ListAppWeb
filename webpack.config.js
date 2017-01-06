const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const ENV_DEVELOPMENT = NODE_ENV === 'development'
const ENV_PRODUCTION = NODE_ENV === 'production'
// const ENV_TEST = NODE_ENV === 'test'

const PATHS = {
  base: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist')
}

const HOST = 'localhost'
const PORT = '8080'

// Base configuration
const config = {
  entry: {
    main: ['./main.js']
  },

  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },

  context: PATHS.base,

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: /font-awesome/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.png',
      title: 'ListApp',
      emitStats: false,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    sourceComments: false
  }
}

// Additional configuration for development env
if (ENV_DEVELOPMENT) {
  config.entry.main.unshift(
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill'
  )

  config.debug = true
  config.devtool = 'cheap-module-source-map'

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  config.devServer = {
    host: HOST,
    port: PORT,
    hot: true,
    historyApiFallback: true
  }
}

// Additional configuration for production env
if (ENV_PRODUCTION) {
  config.output.filename = '[name].[chunkhash].js'

  config.devtool = 'source-map'

  config.plugins.push(
    new WebpackMd5Hash(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      'mangle': true,
      'compress': {
        'dead_code': true,
        'screw_ie8': true,
        'unused': true,
        'warnings': false
      }
    })
  )
}

module.exports = config
