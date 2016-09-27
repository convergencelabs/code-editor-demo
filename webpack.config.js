var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: SRC_DIR + '/jsx/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'code-editor.js'
  },
  externals: [{
    "ace": "ace"
  }],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR + "/jsx",
        loader: 'babel'
      }, {
        test: /\.js?/,
        include: SRC_DIR + "/js",
        loader: 'babel'
      }
    ]
  }
};

module.exports = config;