var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    SRC_DIR + '/jsx/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'code-editor.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
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