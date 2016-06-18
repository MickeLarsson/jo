var path = require('path');
var webpack = require('webpack');

var bourbon = require('bourbon-neat').includePaths;

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:7770',
    'webpack/hot/only-dev-server',
    './src/jo'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
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
