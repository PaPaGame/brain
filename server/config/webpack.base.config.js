const webpack = require('webpack');
// 引入路径
const path = require('path');

const ver = require('../package.json').version;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: {
    index: resolve('src/server.js')
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      loader: 'babel-loader',
      include: resolve('src'),
      exclude: '/node_modules'
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }]
  },
  node: {
    dns: 'empty',
    fs: 'empty',
    'module': 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        LOG_LEVEL: JSON.stringify(process.env.LOG_LEVEL),
        VERSION: JSON.stringify(ver)
      }
    })
  ]
};
module.exports = webpackConfig;
