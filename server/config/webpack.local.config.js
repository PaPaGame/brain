const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackConfig = merge(baseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true,
    open: false,
    host: 'localhost',
    port: 9050,
    compress: false
  }
});

module.exports = webpackConfig;
