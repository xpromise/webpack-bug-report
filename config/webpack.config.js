const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

const NODE_ENV = process.env.NODE_ENV;

const isEnvDev = NODE_ENV === 'development';
const isEnvProd = NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: isEnvProd ? resolve(__dirname, '../build') : undefined,
    filename: isEnvProd
      ? 'static/js/[name].[contenthash:10].js'
      : 'static/js/bundle.js',
    chunkFilename: isEnvProd
      ? 'static/js/[name].[contenthash:10].chunk.js'
      : 'static/js/[name].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isEnvProd
        ? { collapseWhitespace: true, removeComments: true }
        : undefined
    }),
    isEnvProd && new CleanWebpackPlugin(),
    isEnvDev && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
  mode: NODE_ENV,
  devServer: {
    compress: true,
    contentBase: resolve(__dirname, '../public'),
    hot: true,
    host: 'localhost',
    port: 3000,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  }
};
