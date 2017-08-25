'use strict';

const path = require('path');
const webpack = require('webpack');
const CWD = process.cwd();
const SRC_FILE = path.join(CWD, 'app.js');
const SRC = path.dirname(SRC_FILE);
const BUILD = path.join(CWD, 'dll');

const config = {
  entry: {
    'dev': ['react-hot-loader'],
  },
  output: {
    filename: '[name]-dll.js',
    path: BUILD,
    library: '[name]_dll',
  },
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
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: BUILD + '/[name]-dll-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_dll'
    })
  ],
};

module.exports = config;
