var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './public/js/server.js',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      { 
        test: /.ts$/, loader: 'ts-loader' 
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  "target": "node",
  externals: [nodeExternals()],
  mode: "development",
};