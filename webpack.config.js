const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    watchContentBase: true,
    publicPath: '/dist/',
    hot: true
  },
  plugins: [new HotModuleReplacementPlugin()],
  module: {
    rules: [{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};