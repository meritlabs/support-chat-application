const webpack = require('webpack'),
  path = require('path'),
  tsLoader = require('ts-loader'),
  autoprefixer = require('autoprefixer'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ImageminPlugin = require('imagemin-webpack-plugin').default;
module.exports = {
  devtool: 'inline-source-map',
  entry: './src/chat-form/form.ts',
  output: {
    filename: 'server/chat-form/form.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  node: {
    fs: 'empty',
  },
};
