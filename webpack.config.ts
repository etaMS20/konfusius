import Dotenv from 'dotenv-webpack';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(__dirname, '.env');

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts',
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert'),
    },
  },
};

if (fs.existsSync(envPath)) {
  module.exports.plugins = [new Dotenv({ path: envPath })];
}
