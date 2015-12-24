'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'autoprefixer-loader?browsers=last 2 version', 'sass?sourceMap'],
      include: path.join(__dirname, 'app')
    },  {
      test: /\.(jpe?g|png|eot|woff|ttf|gif|svg)(\?.*)?$/i,
      loader: 'file-loader',
      include: path.join(__dirname, 'app')
    }]
  }
};