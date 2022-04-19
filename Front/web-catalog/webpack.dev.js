const path = require('path');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.common');


module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  },
  plugins: [
    new Dotenv({
        path: './.env.dev'
    })
  ]
});