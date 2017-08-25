'use strict';

const DevServer = require('webpack-dev-server');
const fs = require('fs');
const webpack = require('webpack');

const port = 4000;

const config = require('./webpack.dev');
const schema = config.devServer.https ? 'https' : 'http';
const host = config.devServer.host || 'localhost';

config.entry.unshift(
  "react-hot-loader/patch",
  `webpack-dev-server/client?${schema}://${host}:${port}`,
  'webpack/hot/dev-server'
);

console.log('starting dev server');

const compiler = webpack(config);

config.output.publicPath = "http://" + host + ":" + port + config.output.publicPath;

const server = new DevServer(compiler, config.devServer);

server.listen(port, host, () => console.log(`Listening on ${schema}://${host}:${port}`));

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});


