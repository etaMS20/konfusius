import Dotenv from 'dotenv-webpack';
import path from 'path';

module.exports = {
  plugins: [new Dotenv({ path: path.resolve(__dirname, '.env') })],
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
};
