var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    SRC_DIR + '/jsx/index.jsx',
    SRC_DIR + '/sass/code-editor.scss'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'code-editor.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
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
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader'
    }]
  }
};

module.exports = config;