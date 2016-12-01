var webpack = require('webpack');
var path = require('path');
var loader = require('babel-loader');

var BUILD_DIR = path.resolve(__dirname, 'client/src/public');
var APP_DIR = path.resolve(__dirname, 'client/src');

var getPlugins = function() {
  var plugins = [];

  // do this push stuff in case we have to 
  // configure more plugins for production or
  // development
  plugins.push( new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
  }));
  return plugins;
};

var config = {
  entry: APP_DIR + '/index.jsx',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'cheerio':
    'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        },
        exclude: /node_modules/,
      }
    ],
  },
  plugins: getPlugins(),
  watch: true
};

module.exports = config;
