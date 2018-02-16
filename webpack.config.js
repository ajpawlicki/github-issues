const SRC = __dirname + '/react-client/src/';
const DIST = __dirname + '/react-client/dist/';

module.exports = {
  entry: SRC + 'index.js',
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        include: SRC,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }
};
