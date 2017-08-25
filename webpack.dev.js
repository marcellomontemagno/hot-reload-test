'use strict';

process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const CWD_NODE_MODULES = path.join(CWD, 'node_modules');
const SRC_FILE = path.join(CWD, 'app.js');
const SRC = path.dirname(SRC_FILE);
const HtmlPlugin = require('html-webpack-plugin');

let devConfig = {
  entry: ['babel-polyfill', 'whatwg-fetch', SRC_FILE],
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [CWD_NODE_MODULES],
    extensions: ['.js', '.jsx', '.json']
  },
  resolveLoader: {
    modules: [CWD_NODE_MODULES]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlPlugin({
      template: path.join(__dirname, './template.ejs'),
      hash: true,
      xhtml: true,
      "title": "example",
      "description": "hot reload example"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.join(CWD, 'dll/dev-dll-manifest.json'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [SRC],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['babel-preset-es2015', {"modules": false}],
                'babel-preset-flow',
                'babel-preset-stage-0',
                'babel-preset-react'
              ],
              plugins: [
                'react-hot-loader/babel'
              ]
            }
          },
        ],
      },
    ]
  },
  devServer: {
    contentBase: [path.join(process.cwd(), 'src'), path.join(process.cwd(), 'dll')],
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    disableHostCheck: true
  }
};

module.exports = devConfig;
