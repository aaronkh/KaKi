const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
  entry: {
    'test': './test.js', 
    'seed-db': './scripts/seed.js', 
    ...slsw.lib.entries
  },
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { targets: { node: '16.15.0' } }]],
            },
          },
        ],
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  }
};