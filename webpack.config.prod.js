var path = require('path');
var webpack = require('webpack');

var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/reduxstagram'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
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
      loader: `style!css!sass?includePaths[]=${bourbon, neat}`
    }
    ]
  }
};
