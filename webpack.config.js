const path = require('path');

module.exports = {
  entry: './build/client/pre-webpack/index.js',
  output: {
    path: path.resolve(__dirname, 'build/client/dist'),
    filename: 'index.js'
  }
};
