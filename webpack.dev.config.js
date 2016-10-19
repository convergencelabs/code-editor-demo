var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var sassExtractor = new ExtractTextPlugin("code-editor.css");

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    SRC_DIR + '/jsx/index.jsx',
    SRC_DIR + '/sass/code-editor.scss'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'code-editor.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    sassExtractor
  ],
  externals: [{
    "ace": "ace"
  }],
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: SRC_DIR + "/jsx",
      loader: 'babel'
    }, {
      test: /\.js?/,
      include: SRC_DIR + "/js",
      loader: 'babel'
    }, {
      test: /\.scss$/,
      include: SRC_DIR +  '/sass',
      loader: sassExtractor.extract(["css", "sass"])
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader'
    }]
  }
};

module.exports = config;