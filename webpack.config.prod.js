var path = require('path');
var webpack = require('webpack');

var bourbon = require('bourbon-neat').includePaths;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/jo'
  ],
  output: {
    path: path.join(__dirname, 'public/static'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Jo',
      filename: 'index.html',
      template: 'index_template.html',
      appMountId: 'root',
    })
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    // CSS
    {
      test: /\.styl$/,
      include: path.join(__dirname, 'src'),
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.scss$/,
      include: path.join(__dirname, 'src'),
      loader: `style!css!sass?includePaths[]=${bourbon}`
    }
    ]
  }
};
