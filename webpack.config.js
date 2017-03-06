const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

const sassExtractor = new ExtractTextPlugin("code-editor.css");

const config = {
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
    }),
    sassExtractor
  ],
  externals: [{
    "ace": "ace"
  }],
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: SRC_DIR + "/jsx",
      loader: 'babel',
      query: {
        'presets': ['es2015', 'stage-0', 'react'],
        'plugins': ['transform-decorators-legacy']
      }
    }, {
      test: /\.js?/,
      include: SRC_DIR + "/js",
      loader: 'babel',
      query: {
        'presets': ['es2015', 'stage-0', 'react'],
        'plugins': ['transform-decorators-legacy']
      }
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