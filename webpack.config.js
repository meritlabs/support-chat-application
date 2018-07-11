const webpack = require('webpack'),
  path = require('path'),
  tsLoader = require('ts-loader'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
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
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader?exportAsEs6Default',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};
