var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    SRC_DIR + '/jsx/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'code-editor.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
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